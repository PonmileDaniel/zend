package com.fintech.zend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.welcome.WelcomeCredit;
import com.fintech.zend.model.welcome.WelcomeCreditStatus;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.repository.WelcomeCreditRepository;

import jakarta.transaction.Transactional;

@Service
public class WelcomeCreditService {
    private final WelcomeCreditRepository welcomeCreditRepository;
    private final BankAccountRepository accountRepository;

    public WelcomeCreditService(WelcomeCreditRepository welcomeCreditRepository,
            BankAccountRepository accountRepository) {
                this.welcomeCreditRepository = welcomeCreditRepository;
                this.accountRepository = accountRepository;

    }
    @Scheduled(fixedDelay =  1000)
    @Transactional
    public void processPendingWelcomeCredits() {
        List<WelcomeCredit> pendingCredits = welcomeCreditRepository.findByStatusAndScheduledAtLessThanEqual(WelcomeCreditStatus.PENDING, LocalDateTime.now());

        for (WelcomeCredit welcomeCredit : pendingCredits) {
            BankAccount account = accountRepository.findByAccountNumber(welcomeCredit.getBankAccount().getAccountNumber()).orElseThrow(() -> new IllegalArgumentException("Accountn not found"));

            account.receiveWelcomeFunds(welcomeCredit.getAmount(), welcomeCredit.getReference());
            welcomeCredit.markCompleted();
            welcomeCreditRepository.save(welcomeCredit);
        }

    }


}
