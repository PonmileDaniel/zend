package com.fintech.zend.model.welcome;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.fintech.zend.model.BankAccount;

import jakarta.persistence.*;

@Entity
@Table(name = "welcome_credits")
public class WelcomeCredit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bank_account_id", nullable = false, unique = true)
    private BankAccount bankAccount;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String reference;

    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    private LocalDateTime processedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WelcomeCreditStatus status;

    public WelcomeCredit() {
    }

    public WelcomeCredit(BankAccount bankAccount, BigDecimal amount, String reference, LocalDateTime scheduledAt) {
        this.bankAccount = bankAccount;
        this.amount = amount;
        this.reference = reference;
        this.scheduledAt = scheduledAt;
        this.status = WelcomeCreditStatus.PENDING;
    }

    public Long getId() {
        return id;
    }

    public BankAccount getBankAccount() {
        return  bankAccount;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getReference() {
        return reference;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }
    public LocalDateTime getProcessedAt() {
        return processedAt;
    }

    public WelcomeCreditStatus getStatus() {
        return status;
    }

    public void markCompleted() {
        this.status = WelcomeCreditStatus.COMPLETED;
        this.processedAt = LocalDateTime.now();
    }
}
