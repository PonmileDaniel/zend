package com.fintech.zend.service;

import com.fintech.zend.dto.dashboard.DashboardResponse;
import com.fintech.zend.dto.transaction.TransactionResponse;
import com.fintech.zend.model.BankAccount;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

        private final BankAccountRepository accountRepository;
        private final TransactionService transactionService;

        public DashboardService(
                        BankAccountRepository accountRepository,
                        TransactionService transactionService) {

                this.accountRepository = accountRepository;
                this.transactionService = transactionService;
        }

        public DashboardResponse getDashboard() {

                SessionPrincipal user = SecurityUtils.getCurrentUser();

                BankAccount account = accountRepository
                                .findByAccountNumber(user.getAccountNumber())
                                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

                List<TransactionResponse> recentTransactions = transactionService
                                .getTransaction(0, 5)
                                .getContent();

                return new DashboardResponse(
                                account.getAccountNumber(),
                                account.getBalance(),
                                recentTransactions);
        }
}