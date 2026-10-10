package com.fintech.zend.service;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.fintech.zend.repository.TransactionRepository;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;
import com.fintech.zend.model.Transactions.Transaction;
import com.fintech.zend.model.Transactions.TransactionType;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.repository.UserRepository;
import com.fintech.zend.dto.transaction.TransactionResponse;
import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.User;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final BankAccountRepository accountRepository;
    private final UserRepository userRepository;

    private TransactionService(TransactionRepository transactionRepository, BankAccountRepository accountRepository,UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    public Page<TransactionResponse> getTransaction(int page, int size) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();

        BankAccount account = accountRepository.findByAccountNumber(user.getAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        Pageable pageable = PageRequest.of(page, size);

        return transactionRepository.findByBankAccountOrderByTimestampDesc(account, pageable).map(this::toResponse);

    }
    private TransactionResponse toResponse(Transaction transaction) {
        String otherUserName = getOtherUserName(transaction);
        return new TransactionResponse( transaction.getReference(),
                transaction.getDescription(),
                transaction.getAmount(),
                transaction.getTransactionType().name(),
                transaction.getDirection().name(),
                transaction.getStatus().name(),
                transaction.getTimestamp(), otherUserName);
    }

    private String getOtherUserName(Transaction transaction) {
        if (transaction.getTransactionType() != TransactionType.TRANSFER) {
            return transaction.getDescription();
        }

        // Find the corresponding transaction belonging to the other account
        List<Transaction> relatedTransactions = transactionRepository.findByReferenceAndBankAccountNot(transaction.getReference(), transaction.getBankAccount());

        if (relatedTransactions.isEmpty()) {
            return transaction.getDescription();
        }

        Transaction otheTransaction = relatedTransactions.get(0);
        BankAccount otherAccount = otheTransaction.getBankAccount();

        User otherUser = userRepository.findByBankAccount_AccountNumber(otherAccount.getAccountNumber()).orElse(null);

        if (otherUser == null) {
            return transaction.getDescription();
        }
        return otherUser.getFirstName() + " " + otherUser.getLastName();
    }
}