package com.fintech.zend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fintech.zend.model.welcome.WelcomeCredit;
import com.fintech.zend.model.welcome.WelcomeCreditStatus;

public interface WelcomeCreditRepository extends JpaRepository<WelcomeCredit, Long> {
    List<WelcomeCredit> findByStatusAndScheduledAtLessThanEqual(WelcomeCreditStatus status, LocalDateTime scheduledAt);

}
