package com.fintech.zend.dto.pin;

public class TransactionPinResponse {
    private String message;

    public TransactionPinResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
