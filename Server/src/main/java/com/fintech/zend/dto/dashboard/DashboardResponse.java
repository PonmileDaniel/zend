package com.fintech.zend.dto.dashboard;

import java.math.BigDecimal;
import java.util.List;

import com.fintech.zend.dto.transaction.TransactionResponse;

public class DashboardResponse {
    private String accountNumber;
    private BigDecimal balance;
    private List<TransactionResponse> recentTransactions;
    private boolean transactionPinConfigured;

    public DashboardResponse(String accountNumber,
            BigDecimal balance,
            List<TransactionResponse> recentTransactions,
        boolean transactionPinConfigured) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.recentTransactions = recentTransactions;
        this.transactionPinConfigured = transactionPinConfigured;

    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public List<TransactionResponse> getRecentTransactions() {
        return recentTransactions;
    }

    public boolean isTransactionPinConfigured() {
        return transactionPinConfigured;
    }

    public void setTransactionPinConfigured(boolean transactionPinConfigured) {
        this.transactionPinConfigured = transactionPinConfigured;
    }
}
