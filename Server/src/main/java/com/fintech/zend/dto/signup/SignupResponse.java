package com.fintech.zend.dto.signup;

public class SignupResponse {
    private String message;
    private String username;
    private String accountNumber;

    public SignupResponse(String message, String username, String accountNumber) {
        this.message = message;
        this.username = username;
        this.accountNumber = accountNumber;
    }


    public String getMessage() {
        return message;
    }

    public String getUsername() {
        return username;
    }

    public String getAccountNumber() {
        return accountNumber;
    }
}
