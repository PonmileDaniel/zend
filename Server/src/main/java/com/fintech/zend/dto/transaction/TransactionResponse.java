package com.fintech.zend.dto.transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionResponse {

    private String description;
    private BigDecimal amount;
    private String transactionType;
    private String direction;
    private String status;
    private LocalDateTime timestamp;
    private String reference;
    private String name;

    public TransactionResponse(
            String reference,
            String description,
            BigDecimal amount,
            String transactionType,
            String direction,
            String status,
            LocalDateTime timestamp, String name) {

        this.reference = reference;
        this.description = description;
        this.amount = amount;
        this.transactionType = transactionType;
        this.direction = direction;
        this.status = status;
        this.timestamp = timestamp;
        this.name = name;
    }

    public String getReference() {
        return reference;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public String getDirection() {
        return direction;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getName() {
        return name;
    } 
}