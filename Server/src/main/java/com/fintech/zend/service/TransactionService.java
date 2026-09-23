package com.fintech.zend.service;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.fintech.zend.repository.TransactionRepository;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;
import com.fintech.zend.model.Transaction;


import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.dto.transaction.TransactionResponse;
import com.fintech.zend.model.BankAccount;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final BankAccountRepository accountRepository;

    private TransactionService(TransactionRepository transactionRepository, BankAccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public Page<TransactionResponse> getTransaction(int page, int size) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();

        BankAccount account = accountRepository.findByAccountNumber(user.getAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        Pageable pageable = PageRequest.of(page, size);

        return transactionRepository.findByBankAccountOrderByTimestampDesc(account, pageable).map(this::toResponse);

    }
    private TransactionResponse toResponse(Transaction transaction) {
        return new TransactionResponse( transaction.getReference(),
                transaction.getDescription(),
                transaction.getAmount(),
                transaction.getTransactionType().name(),
                transaction.getDirection().name(),
                transaction.getStatus().name(),
                transaction.getTimestamp());
    }
}