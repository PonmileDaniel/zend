package com.fintech.zend.dto;

public class RecentAccountResponse {
    private final String name;
    private final String accountNumber;

    public RecentAccountResponse(String name, String accountNumber) {
        this.name = name;
        this.accountNumber = accountNumber;
    }

    public String getName() {
        return name;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

}
