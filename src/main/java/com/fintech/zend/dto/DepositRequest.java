package com.fintech.zend.dto;

import java.math.BigDecimal;

public class DepositRequest {
    public BigDecimal amount;

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}