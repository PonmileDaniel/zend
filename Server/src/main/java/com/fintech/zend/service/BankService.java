package com.fintech.zend.service;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.InsufficientFundsException;
import com.fintech.zend.model.User;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.repository.UserRepository;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;

@Service
public class BankService {

    private final BankAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public BankService(BankAccountRepository accountRepository, UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
            throw new IllegalStateException("You must set up a 4-digit transaction PIN before making transfers.");
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
            from.withdraw(amount, reference);

            to.receiveTransfer(amount, description, reference);
        } catch (InsufficientFundsException e) {
            throw new IllegalStateException(e.getMessage());
        }

        accountRepository.save(from);
        accountRepository.save(to);
    }

    /**
     * Deposits money into a bank account.
     * 
     * @param accountNumber The account number to deposit into.
     * @param amount        The amount of money to deposit.
     * 
     * @throws SecurityException        If the user is not authorized to deposit
     *                                  into the given account.
     * @throws IllegalArgumentException If the account is not found.
     */
    @Transactional
    public void deposit(String accountNumber, BigDecimal amount) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();
        String reference = generateTransactionReference();

        if (!user.getAccountNumber().equals(accountNumber)) {
            throw new SecurityException("You are not authorized to deposit into this account");
        }
        BankAccount account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
        account.deposit(amount, reference);
        accountRepository.save(account);
    }

    /**
     * Retrieves the statement of a bank account.
     * 
     * @param accountNumber the account number of the account to retrieve the
     *                      statement for
     * @return a BankAccount object if the request was successful, or an error
     *         message if the request failed
     * 
     * @throws SecurityException if the authenticated user is not authorized to
     *                           access the account
     */
    public BankAccount getStatement(String accountNumber) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();

        if (!user.getAccountNumber().equals(accountNumber)) {
            throw new SecurityException("You are not authorized to access the account");
        }
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
    }

    private String generateTransactionReference() {
        return "TXN-" + UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }

    public BigDecimal getTotalBalance() {
        return accountRepository.findAll().stream().map(BankAccount::getBalance).reduce(BigDecimal.ZERO,
                BigDecimal::add);
    }

    // public void printAccountNames() {
    // accountRepository.findAll().stream().map(BankAccount::getHolderName).forEach(System.out::println);
    // }

    // public void printHighBalanceAccounts(double minimumBalance) {
    // accountRepository.findAll().stream()
    // .filter(account -> account.getBalance() >= minimumBalance)
    // .forEach(acc -> System.out.println(
    // acc.getAccountNumber() + " | " +
    // acc.getHolderName() + " | Balance: " +
    // String.format("%.2f", acc.getBalance())));
    // }

    // public void printAllAccounts() {
    // System.out.println("\n=== All Accounts ===");
    // List<BankAccount> accounts = accountRepository.findAll();
    // if (accounts.isEmpty()) {
    // System.out.println("No accounts to display.");
    // return;
    // }
    // accounts.stream().forEach(acc -> System.out.println(acc.getAccountNumber() +
    // " | " + acc.getHolderName()
    // + " | Balance: " + String.format("%.2f", acc.getBalance())));
    // }

    // public String getHolderName(String accountNumber) {
    // BankAccount account = accountRepository.findByAccountNumber(accountNumber)
    // .orElseThrow(() -> new IllegalArgumentException("Account not found"));
    // return account.getHolderName();
    // }

    // public List<BankAccount> getAccounts() {
    // return accountRepository.findAll();
    // }

    // public void removeAccount(String accountNumber) {
    // BankAccount account = accountRepository.findByAccountNumber(accountNumber)
    // .orElseThrow(() -> new IllegalArgumentException("Account not found"));
    // accountRepository.delete(account);
    // System.out.println("Account removed successfully");

    // }

    // public void printAllTransactions(String accountNumber) {
    // Optional<BankAccount> account = findAccount(accountNumber);
    // if (account.isEmpty()) {
    // System.out.println("Account " + accountNumber + " not found.");
    // return;
    // }
    // account.get().printStatement();
    // }

    // public Optional<BankAccount> findAccount(String accountNumber) {
    // return accountRepository.findByAccountNumber(accountNumber);
    // }

}