package com.fintech.zend.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;



@Entity
@Table(name = "bank_accounts")

public class BankAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String holderName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "account_number", referencedColumnName = "accountNumber")
    private List<Transaction> transactions = new ArrayList<>();

    private double balance;


    public BankAccount() {
    }

    // Constructor
    public BankAccount(String accountNumber, String holderName) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = 0.0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getHolderName() {
        return holderName;
    }

    public void setHolderName(String holderName) {
        this.holderName = holderName;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public void addTransaction(String description, double amount) {
        Transaction tx = new Transaction();
        tx.setBankAccount(this);
        tx.setDescription(description);
        tx.setAmount(amount);
        tx.setTimestamp(java.time.LocalDateTime.now());
        this.transactions.add(tx);
    }


    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be greater than zero.");
        }
        this.balance += amount;
        addTransaction("Deposited: +" + String.format("%.2f", amount), amount);
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive.");
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds. Balance: " + String.format("%.2f", balance));
        }
        this.balance -= amount;
        addTransaction("Withdrew: -" + String.format("%.2f", amount), -amount);
    }

    public void printStatement() {
        for (Transaction tx : transactions) {
            System.out.println(
                tx.getTimestamp() + " | " +
                tx.getDescription() + " | " +
                tx.getAmount()
            );
        }
    }


    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Account: ").append(accountNumber)
                .append(" | Holder: ").append(holderName)
                .append(" | Balance: ").append(String.format("%.2f", balance)).append("\n");
        sb.append("Transactions:\n");
        for (Transaction tx : transactions) {
            sb.append(tx).append("\n");
        }
        return sb.toString();
    }
}
