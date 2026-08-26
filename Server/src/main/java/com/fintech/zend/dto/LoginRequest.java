package com.fintech.zend.dto;

public class LoginRequest {

    private String emailorAccountNumber;
    private String password;

    public String getemailorAccountNumber() {
        return emailorAccountNumber;
    }

    public void setemailorAccountNumber(String emailorAccountNumber) {
        this.emailorAccountNumber = emailorAccountNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
