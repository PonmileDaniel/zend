package com.fintech.zend.dto;

public class OtpResponse {

    private String message;

    public OtpResponse() {
    }

    public OtpResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}