package com.fintech.zend.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "bank_accounts")

public class BankAccount implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "bankAccount", orphanRemoval = true)
    private List<Transaction> transactions = new ArrayList<>();

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal balance;

    public BankAccount() {
    }

    // Constructor
    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;
        // this.holderName = holderName;
        this.balance = BigDecimal.ZERO;
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

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public void addTransaction(String description, BigDecimal amount, TransactionType transactionType,
            TransactionDirection direction, String reference) {
        Transaction tx = new Transaction();
        tx.setBankAccount(this);
        tx.setDescription(description);
        tx.setReference(reference);
        tx.setAmount(amount);
        tx.setTimestamp(java.time.LocalDateTime.now());
        tx.setTransactionType(transactionType);
        tx.setDirection(direction);
        tx.setStatus(TransactionStatus.SUCCESS);
        this.transactions.add(tx);
    }

    public void deposit(BigDecimal amount, String reference) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be greater than zero.");
        }
        this.balance = this.balance.add(amount);
        addTransaction("Deposit ", amount, TransactionType.DEPOSIT, TransactionDirection.INWARD, reference);
    }

    public void withdraw(BigDecimal amount, String reference) throws InsufficientFundsException {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive.");
        }
        if (amount.compareTo(balance) > 0) {
            throw new InsufficientFundsException("Insufficient funds. Balance: " + balance);
        }
        this.balance = this.balance.subtract(amount);
        addTransaction("Transfer", amount, TransactionType.TRANSFER, TransactionDirection.OUTWARD, reference);
    }

    public void receiveTransfer(
            BigDecimal amount,
            String description, String reference) {

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException(
                    "Transfer amount must be greater than zero.");
        }

        this.balance = this.balance.add(amount);

        addTransaction(
                description,
                amount,
                TransactionType.TRANSFER,
                TransactionDirection.INWARD, reference);
    }

    public void printStatement() {
        for (Transaction tx : transactions) {
            System.out.println(
                    tx.getTimestamp() + " | " +
                            tx.getDescription() + " | " +
                            tx.getAmount());
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Account: ").append(accountNumber)
                .append(" | Balance: ").append(String.format("%.2f", balance)).append("\n");
        sb.append("Transactions:\n");
        for (Transaction tx : transactions) {
            sb.append(tx).append("\n");
        }
        return sb.toString();
    }
}
