package com.fintech.zend.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.fintech.zend.dto.SignupRequest;
import com.fintech.zend.dto.SignupResponse;
import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.User;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BankAccountRepository accountRepository;
    private final Random random = new Random();


    public AuthService(UserRepository userRepository, BankAccountRepository accountRepository) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
    }

    public SignupResponse signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }

        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new IllegalArgumentException("Phone number already exists.");
        }

        String username = generateUsername(request.getFirstName(), request.getLastName());
        String accountNumber = generateAccountNumber();

        BankAccount account = new BankAccount(
                accountNumber,
                request.getFirstName() + " " + request.getLastName()
        );

        accountRepository.save(account);

        User user = new User(
                request.getFirstName(),
                request.getLastName(),
                username,
                accountNumber,
                request.getPhoneNumber(),
                request.getEmail(),
                request.getPassword(),
                account
        );

        userRepository.save(user);

        return new SignupResponse(
            "User Registered Successfully",
            username,
            accountNumber
        );
    }


    public void login(String emailOrAccountNumber, String password) {

        User user = userRepository.findByEmail(emailOrAccountNumber)
                .or(() -> userRepository.findByAccountNumber(emailOrAccountNumber))
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials."));

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid credentials.");
        }
    }

    private String generateUsername(String firstName, String lastName) {

        String username;

        do {
            username = firstName.toLowerCase()
                    + "."
                    + lastName.toLowerCase()
                    + (100 + random.nextInt(900));

        } while (userRepository.findByUsername(username).isPresent());

        return username;
    }


    public String generateAccountNumber() {
        String accountNumber;

        do {
            long number = 1_000_000_000L + (long) (random.nextDouble() * 9_000_000_000L);
            accountNumber = String.valueOf(number);

        } while (accountRepository.findByAccountNumber(accountNumber).isPresent());
            return accountNumber;  
    }
}
