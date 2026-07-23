package com.fintech.zend.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.InsufficientFundsException;
import com.fintech.zend.repository.BankAccountRepository;

@Service
public class BankService {

    private final BankAccountRepository accountRepository;
    private final Random random = new Random();

    public BankService(BankAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void createAccount(String holderName) {
        String accNum = generateAccountNumber();
        BankAccount newAccount = new BankAccount(accNum, holderName);
        accountRepository.save(newAccount);
    }

    private String generateAccountNumber() {
        String accountNumber;

        do {
            long number = 1_000_000_000l + (long) (random.nextDouble() * 9_000_000_000l);
            accountNumber = String.valueOf(number);
        } while (accountRepository.findByAccountNumber(accountNumber).isPresent());
        return accountNumber;
    }



    @Transactional
    public void transfer(String fromNum, String toNum, double amount) {
        BankAccount from = accountRepository.findByAccountNumber(fromNum)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));
        BankAccount to = accountRepository.findByAccountNumber(toNum)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        // Use the withdraw/deposit method
        try {
            from.withdraw(amount);
        } catch (InsufficientFundsException e) {
            throw new IllegalStateException(e.getMessage());
        }
        to.deposit(amount);

        accountRepository.save(from);
        accountRepository.save(to);
    }

    @Transactional
    public void deposit(String accountNumber, double amount) {
        BankAccount account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
        account.deposit(amount);
        accountRepository.save(account);
    }

    public BankAccount getStatement(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
    }

    public String getHolderName(String accountNumber) {
        BankAccount account = accountRepository.findByAccountNumber(accountNumber).orElseThrow(() -> new IllegalArgumentException("Account not found"));
        return account.getHolderName();
    }

    public List<BankAccount> getAccounts() {
        return accountRepository.findAll();
    }

    public void printAllAccounts() {
        System.out.println("\n=== All Accounts ===");
        List<BankAccount> accounts = accountRepository.findAll();
        if (accounts.isEmpty()) {
            System.out.println("No accounts to display.");
            return;
        }
        accounts.stream().forEach(acc -> System.out.println(acc.getAccountNumber() + " | " + acc.getHolderName()
                + " | Balance: " + String.format("%.2f", acc.getBalance())));
    }

    public void removeAccount(String accountNumber) {
        BankAccount account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
        accountRepository.delete(account);
        System.out.println("Account removed successfully");

    }

    public void printAllTransactions(String accountNumber) {
        Optional<BankAccount> account = findAccount(accountNumber);
        if (account.isEmpty()) {
            System.out.println("Account " + accountNumber + " not found.");
            return;
        }
        account.get().printStatement();
    }

    public Optional<BankAccount> findAccount(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    public double getTotalBalance() {
        return accountRepository.findAll().stream().mapToDouble(BankAccount::getBalance).sum();
    }

    public void printAccountNames() {
        accountRepository.findAll().stream().map(BankAccount::getHolderName).forEach(System.out::println);
    }

    public void printHighBalanceAccounts(double minimumBalance) {
        accountRepository.findAll().stream()
                .filter(account -> account.getBalance() >= minimumBalance)
                .forEach(acc -> System.out.println(
                        acc.getAccountNumber() + " | " +
                                acc.getHolderName() + " | Balance: " +
                                String.format("%.2f", acc.getBalance())));
    }
}