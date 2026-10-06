package com.fintech.zend.service;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fintech.zend.model.BankAccount;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;

@Service
public class BankService {

    private final BankAccountRepository accountRepository;

    public BankService(BankAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    /**
     * Deposits money into a bank account.
     * 
     * @param accountNumber The account number to deposit into.
     * @param amount        The amount of money to deposit.
     * 
     * @throws SecurityException        If the user is not authorized to deposit
     *                                  into the given account.
     * @throws IllegalArgumentException If the account is not found.
     */
    @Transactional
    public void deposit(String accountNumber, BigDecimal amount) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();
        String reference = generateTransactionReference();

        if (!user.getAccountNumber().equals(accountNumber)) {
            throw new SecurityException("You are not authorized to deposit into this account");
        }
        BankAccount account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
        account.deposit(amount, reference);
        accountRepository.save(account);
    }

    /**
     * Retrieves the statement of a bank account.
     * 
     * @param accountNumber the account number of the account to retrieve the
     *                      statement for
     * @return a BankAccount object if the request was successful, or an error
     *         message if the request failed
     * 
     * @throws SecurityException if the authenticated user is not authorized to
     *                           access the account
     */
    public BankAccount getStatement(String accountNumber) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();

        if (!user.getAccountNumber().equals(accountNumber)) {
            throw new SecurityException("You are not authorized to access the account");
        }
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));
    }

    private String generateTransactionReference() {
        return "TXN-" + UUID.randomUUID().toString().replace("-", "").toUpperCase();
    }

    public BigDecimal getTotalBalance() {
        return accountRepository.findAll().stream().map(BankAccount::getBalance).reduce(BigDecimal.ZERO,
                BigDecimal::add);
    }
}