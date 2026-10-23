package com.fintech.zend.service;

import org.springframework.transaction.annotation.Transactional;

import com.fintech.zend.dto.RecipientResponse;
import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.InsufficientFundsException;
import com.fintech.zend.model.User;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.repository.UserRepository;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;
import com.fintech.zend.model.Transactions.Transaction;
import com.fintech.zend.model.Transactions.TransactionDirection;
import com.fintech.zend.model.Transactions.TransactionStatus;
import com.fintech.zend.model.Transactions.TransactionType;
import com.fintech.zend.repository.TransactionRepository;
import com.fintech.zend.dto.RecentAccountResponse;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TransferService {

        private final UserRepository userRepository;
        private final BankAccountRepository accountRepository;
        private final PasswordEncoder passwordEncoder;
        private final TransactionRepository transactionRepository;

        public TransferService(UserRepository userRepository, BankAccountRepository accountRepository,
                        PasswordEncoder passwordEncoder, TransactionRepository transactionRepository) {
                this.userRepository = userRepository;
                this.accountRepository = accountRepository;
                this.passwordEncoder = passwordEncoder;
                this.transactionRepository = transactionRepository;
        }

        public RecipientResponse findRecipient(String accountNumber) {

                long start = System.currentTimeMillis();

                System.out.println(
                                "LOOKING UP ACCOUNT: [" + accountNumber + "]");

                User user = userRepository
                                .findByBankAccount_AccountNumber(accountNumber)
                                .orElseThrow(() -> new RuntimeException(
                                                "Account not found: " + accountNumber));

                long end = System.currentTimeMillis();

                System.out.println(
                                "DATABASE LOOKUP TOOK: " + (end - start) + " ms");

                return new RecipientResponse(
                                user.getFirstName(),
                                user.getLastName());
        }

        /**
         * Transfer money from one account to another.
         * 
         * @param fromNum The account number to transfer from.
         * @param toNum   The account number to transfer to.
         * @param amount  The amount of money to transfer.
         * 
         * @throws SecurityException        If the user is not authorized to transfer
         *                                  from the given account.
         * @throws IllegalArgumentException If the sender or receiver account is not
         *                                  found, or if the sender and receiver are the
         *                                  same account.
         * @throws IllegalStateException    If the sender account does not have
         *                                  sufficient funds to make the transfer.
         */
        @Transactional
        public void transfer(String fromNum, String toNum, BigDecimal amount, String description, String rawPin) {
                SessionPrincipal user = SecurityUtils.getCurrentUser();

                if (!user.getAccountNumber().equals(fromNum)) {
                        throw new SecurityException("You are not authorized to transfer from this account");
                }

                User sender = userRepository.findByEmail(user.getEmail())
                                .orElseThrow(() -> new IllegalArgumentException("Sender record not found"));

                if (!sender.hasTransactionPin()) {
                        throw new IllegalStateException(
                                        "You must set up a 4-digit transaction PIN before making transfers.");
                }

                if (rawPin == null || !passwordEncoder.matches(rawPin, sender.getTransactionPin())) {
                        throw new IllegalArgumentException("Invalid transaction PIN.");
                }

                BankAccount from = accountRepository.findByAccountNumber(fromNum)
                                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
                BankAccount to = accountRepository.findByAccountNumber(toNum)
                                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

                if (fromNum.equals(toNum)) {
                        throw new IllegalArgumentException("Cannot transfer to the same account");
                }

                String reference = generateTransactionReference();
                try {
                        from.withdraw(amount, description, reference);

                        to.receiveTransfer(amount, description, reference);
                } catch (InsufficientFundsException e) {
                        throw new IllegalStateException(e.getMessage());
                }

                accountRepository.save(from);
                accountRepository.save(to);
        }

        @Transactional(readOnly = true)
        public List<RecentAccountResponse> getRecentAccounts() {

                SessionPrincipal currentUser = SecurityUtils.getCurrentUser();

                BankAccount senderAccount = accountRepository
                                .findByAccountNumber(currentUser.getAccountNumber())
                                .orElseThrow(() -> new IllegalArgumentException("Sender account not found"));

                List<RecentAccountResponse> recentAccounts = new ArrayList<>();
                Set<String> seenAccountNumbers = new HashSet<>();

                Page<Transaction> transactions = transactionRepository
                                .findByBankAccountAndDirectionAndTransactionTypeAndStatusOrderByTimestampDesc(
                                                senderAccount,
                                                TransactionDirection.OUTWARD,
                                                TransactionType.TRANSFER,
                                                TransactionStatus.SUCCESS,
                                                PageRequest.of(0, 50));

                for (Transaction transaction : transactions.getContent()) {

                        List<Transaction> matchingTransactions = transactionRepository.findByReferenceAndBankAccountNot(
                                        transaction.getReference(),
                                        senderAccount);

                        for (Transaction recipientTransaction : matchingTransactions) {

                                if (recipientTransaction.getDirection() != TransactionDirection.INWARD
                                                || recipientTransaction.getTransactionType() != TransactionType.TRANSFER
                                                || recipientTransaction.getStatus() != TransactionStatus.SUCCESS) {
                                        continue;
                                }

                                BankAccount recipientAccount = recipientTransaction.getBankAccount();
                                String accountNumber = recipientAccount.getAccountNumber();

                                if (!seenAccountNumbers.add(accountNumber)) {
                                        continue;
                                }

                                userRepository.findByBankAccount_AccountNumber(accountNumber)
                                                .ifPresent(recipient -> {
                                                        String name = (recipient.getFirstName() + " "
                                                                        + recipient.getLastName()).trim();

                                                        recentAccounts.add(
                                                                        new RecentAccountResponse(name, accountNumber));
                                                });

                                if (recentAccounts.size() == 3) {
                                        return recentAccounts;
                                }
                        }
                }

                return recentAccounts;
        }

        private String generateTransactionReference() {
                return "TXN-" + UUID.randomUUID().toString().replace("-", "").toUpperCase();
        }

}
