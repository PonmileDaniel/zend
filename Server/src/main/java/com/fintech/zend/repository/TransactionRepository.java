package com.fintech.zend.repository;

import java.util.List;

import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.Transactions.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByBankAccountOrderByTimestampDesc(
        BankAccount bankAccount,
        Pageable pageable
    );

    List<Transaction> findByReferenceAndBankAccountNot(
        String reference,
        BankAccount bankAccount
    );
}
