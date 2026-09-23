package com.fintech.zend.repository;

import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByBankAccountOrderByTimestampDesc(
        BankAccount bankAccount,
        Pageable pageable
    );
}
