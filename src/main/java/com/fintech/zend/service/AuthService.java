package com.fintech.zend.service;

import java.util.Random;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

import com.fintech.zend.config.CustomUserDetails;
import com.fintech.zend.dto.LoginRequest;
import com.fintech.zend.dto.LoginResponse;
import com.fintech.zend.dto.SignupRequest;
import com.fintech.zend.dto.SignupResponse;
import com.fintech.zend.model.BankAccount;
import com.fintech.zend.model.User;
import com.fintech.zend.repository.BankAccountRepository;
import com.fintech.zend.repository.UserRepository;
import com.fintech.zend.security.SessionPrincipal;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BankAccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final Random random = new Random();

    public AuthService(UserRepository userRepository, BankAccountRepository accountRepository,
            BCryptPasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
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

        BankAccount account = new BankAccount(accountNumber);
        String encryptedPassword = passwordEncoder.encode(request.getPassword());

        accountRepository.save(account);

        User user = new User(
                request.getFirstName(),
                request.getLastName(),
                username,
                request.getPhoneNumber(),
                request.getEmail(),
                encryptedPassword,
                account);

        userRepository.save(user);

        return new SignupResponse(
                "User Registered Successfully",
                username,
                accountNumber);
    }

    public LoginResponse login(LoginRequest request, HttpServletRequest servletRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getemailorAccountNumber(), request.getPassword()));

            CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

            SessionPrincipal principal = new SessionPrincipal(user.getId(), user.getEmail(),
                    user.getAccountNumber());

            Authentication sessionAuthentication = new UsernamePasswordAuthenticationToken(principal, null,
                    principal.getAuthorities());

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(sessionAuthentication);
            SecurityContextHolder.setContext(context);

            HttpSession session = servletRequest.getSession(true);

            session.setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    context);

            return new LoginResponse("Login Successful");
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Invalid credentials");

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
