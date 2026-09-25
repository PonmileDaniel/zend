package com.fintech.zend.service;

import com.fintech.zend.dto.RecipientResponse;
import com.fintech.zend.model.User;
import com.fintech.zend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class TransferService {

    private final UserRepository userRepository;

    public TransferService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public RecipientResponse findRecipient(String accountNumber) {

        long start = System.currentTimeMillis();

        System.out.println(
                "LOOKING UP ACCOUNT: [" + accountNumber + "]");

        User user = userRepository
                .findByBankAccount_AccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException(
                        "Account not found: " + accountNumber));

        long end = System.currentTimeMillis();

        System.out.println(
                "DATABASE LOOKUP TOOK: " + (end - start) + " ms");

        return new RecipientResponse(
                user.getFirstName(),
                user.getLastName());
    }

}
