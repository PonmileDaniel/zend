package com.fintech.zend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fintech.zend.model.BankAccount;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    Optional<BankAccount> findByAccountNumber(String accountNumber);
}