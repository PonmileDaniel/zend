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

    /**
     * Registers a new user account.
     * 
     * @param request the details of the user to be created
     * @return a response containing the username and account number of the created user, or an error message if the creation failed
     * @throws IllegalArgumentException if the email or phone number already exists
     */
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

    /**
     * Logs in a user to the system.
     * 
     * @param request the email or account number and password of the user to log in
     * @param servletRequest the HTTP request used to log in
     * @return a response containing a successful login message if the login was successful, or an error message if the login failed
     * @throws IllegalArgumentException if the email or account number and password are invalid
     */
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

    /**
     * Generates a unique username for a user based on their first and last name.
     * The generated username is in the format of "firstname.lastnameXXXX" where XXXX is a random number between 100 and 999.
     * The username is guaranteed to be unique by checking against the existing usernames in the database.
     * @param firstName the first name of the user
     * @param lastName the last name of the user
     * @return a unique username for the user
     */
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

    /**
     * Generates a unique account number for a user.
     * The generated account number is in the format of a 10-digit number between 1,000,000,000 and 9,999,999,999.
     * The account number is guaranteed to be unique by checking against the existing account numbers in the database.
     * @return a unique account number for the user
     */
    public String generateAccountNumber() {
        String accountNumber;

        do {
            long number = 1_000_000_000L + (long) (random.nextDouble() * 9_000_000_000L);
            accountNumber = String.valueOf(number);

        } while (accountRepository.findByAccountNumber(accountNumber).isPresent());
        return accountNumber;
    }
}
