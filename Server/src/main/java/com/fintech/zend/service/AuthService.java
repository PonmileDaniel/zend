package com.fintech.zend.service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.StringRedisTemplate;
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
// import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {

    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private final BankAccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SecureRandom random = new SecureRandom();
    private final StringRedisTemplate redisTemplate;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, BankAccountRepository accountRepository,
            BCryptPasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
            StringRedisTemplate redisTemplate, EmailService emailService,
            CustomUserDetailsService customUserDetailsService) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.redisTemplate = redisTemplate;
        this.emailService = emailService;
        this.customUserDetailsService = customUserDetailsService;
    }

    /**
     * Registers a new user account.
     * 
     * @param request the details of the user to be created
     * @return a response containing the username and account number of the created
     *         user, or an error message if the creation failed
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

        String otp = generateOtp();
        String hashedOtp = passwordEncoder.encode(otp);

        String redisKey = "otp:signup:" + request.getEmail();

        redisTemplate.opsForValue().set(
                redisKey,
                hashedOtp,
                5,
                TimeUnit.MINUTES);

        emailService.sendOtp(request.getEmail(), otp);

        return new SignupResponse(
                "User Registered Successfully",
                username,
                accountNumber);
    }

    /**
     * Logs in a user to the system.
     * 
     * @param request        the email or account number and password of the user to
     *                       log in
     * @param servletRequest the HTTP request used to log in
     * @return a response containing a successful login message if the login was
     *         successful, or an error message if the login failed
     * @throws IllegalArgumentException if the email or account number and password
     *                                  are invalid
     */
    public LoginResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getemailorAccountNumber(), request.getPassword()));

            CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

            String otp = generateOtp();
            String hashedOtp = passwordEncoder.encode(otp);
            // Stored hashed otp in Redis
            String redisKey = "otp:login" + user.getEmail();
            redisTemplate.opsForValue().set(redisKey, hashedOtp, 5, TimeUnit.MINUTES);

            // Send otp
            emailService.sendOtp(user.getEmail(), otp);
            return new LoginResponse("Verification code sent to your registered email.");
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Invalid credentials");

        }
    }

    /**
     * Generates a unique username for a user based on their first and last name.
     * The generated username is in the format of "firstname.lastnameXXXX" where
     * XXXX is a random number between 100 and 999.
     * The username is guaranteed to be unique by checking against the existing
     * usernames in the database.
     * 
     * @param firstName the first name of the user
     * @param lastName  the last name of the user
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
     * The generated account number is in the format of a 10-digit number between
     * 1,000,000,000 and 9,999,999,999.
     * The account number is guaranteed to be unique by checking against the
     * existing account numbers in the database.
     * 
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

    private String generateOtp() {
        int otp = 10000 + random.nextInt(90000);
        return String.valueOf(otp);
    }

    /**
     * Configures a transaction PIN for a user.
     * 
     * @param email      the email address of the user
     * @param pin        the transaction PIN to be configured
     * @param confirmPin the confirmation of the transaction PIN
     * @throws IllegalArgumentException if the transaction PIN is not exactly 4
     *                                  digits, or if the
     *                                  two transaction PINs do not match, or if the
     *                                  transaction PIN has already been
     *                                  configured
     */
    public void createTransactionPin(String email, String pin, String confirmPin) {
        if (pin == null || !pin.matches("\\d{4}")) {
            throw new IllegalArgumentException("Transaction PIN must be exactly 4 digits.");
        }

        if (!pin.equals(confirmPin)) {
            throw new IllegalArgumentException("Transaction PINs do not match");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (user.hasTransactionPin()) {
            throw new IllegalArgumentException("Transaction PIN has already been configured.");
        }

        String hashedPin = passwordEncoder.encode(pin);

        user.setTransactionPin(hashedPin);

        userRepository.save(user);
    }

    /**
     * Verifies a user's account using an OTP sent to their registered email
     * address.
     * 
     * @param email   the email address of the user
     * @param otp     the OTP sent to the user's email address
     * @param request the HTTP request used to verify the user
     * @throws IllegalArgumentException if the user is not found, or if the account
     *                                  is
     *                                  already verified, or if the OTP has expired,
     *                                  or if the OTP is
     *                                  invalid
     */
    public void verifyOtp(String email, String otp, HttpServletRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (user.isVerified()) {
            throw new IllegalArgumentException("Account is already verified.");
        }

        String redisKey = "otp:signup:" + email;

        String storedOtp = redisTemplate.opsForValue().get(redisKey);

        if (storedOtp == null) {
            throw new IllegalArgumentException(
                    "OTP has expired. Please request a new code.");
        }

        if (!passwordEncoder.matches(otp, storedOtp)) {
            throw new IllegalArgumentException("Invalid OTP.");
        }

        // OTP is correct
        redisTemplate.delete(redisKey);

        // Mark account as verified
        user.setVerified(true);
        userRepository.save(user);

        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService
                .loadUserByUsername(user.getEmail());

        SessionPrincipal principal = new SessionPrincipal(
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getAccountNumber());

        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null,
                principal.getAuthorities());

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
        request.getSession(true).setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                securityContext);
    }

    /**
     * Verifies a login OTP for a user.
     * 
     * @param email the email address of the user
     * @param otp the OTP to be verified
     * @param request the HTTP request used to verify the OTP
     * @throws IllegalArgumentException if the user is not found, or if the OTP has expired,
     *                                  or if the OTP is invalid
     */
    public void verifyLoginOtp(String email, String otp, HttpServletRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        String redisKey = "otp:login:" + email;

        String storedHashedOtp = redisTemplate.opsForValue().get(redisKey);

        if (storedHashedOtp == null) {
            throw new IllegalArgumentException(
                    "OTP has expired. Please request a new code.");
        }

        if (!passwordEncoder.matches(otp, storedHashedOtp)) {
            throw new IllegalArgumentException("Invalid OTP.");
        }

        // OTP is correct, so delete it.
        redisTemplate.delete(redisKey);

        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService
                .loadUserByUsername(user.getEmail());

        SessionPrincipal principal = new SessionPrincipal(
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getAccountNumber());

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

        securityContext.setAuthentication(authentication);

        SecurityContextHolder.setContext(securityContext);

        request.getSession(true).setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                securityContext);

    }

    /**
     * Resends an OTP to a user's registered email address.
     * 
     * @param email the email address of the user
     * @throws IllegalArgumentException if the user is not found, or if the account
     *                                  is
     *                                  already verified, or if the 60 seconds
     *                                  cooldown has not
     *                                  expired
     */
    public void resendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (user.isVerified()) {
            throw new IllegalArgumentException("Account is already verified.");
        }

        String cooldownKey = "otp:resend-cooldown:" + email;
        Boolean cooldownExists = redisTemplate.hasKey(cooldownKey);
        if (Boolean.TRUE.equals(cooldownExists)) {
            throw new IllegalArgumentException(
                    "Please wait 60 seconds before requesting another OTP.");
        }
        String otp = generateOtp();
        String hashedOtp = passwordEncoder.encode(otp);
        String otpKey = "otp:signup:" + email;

        // Replace the exisiting OTP and reset its 5 minutes expiration
        redisTemplate.opsForValue().set(
                otpKey,
                hashedOtp,
                5,
                TimeUnit.MINUTES);
        // Prevent another resend for 60 seconds
        redisTemplate.opsForValue().set(
                cooldownKey,
                "1",
                60,
                TimeUnit.SECONDS);
        emailService.sendOtp(email, otp);
    }


    public void resendLoginOtp(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        String cooldownKey = "otp:login:resend-cooldown:" + email;
        Boolean cooldownExists = redisTemplate.hasKey(cooldownKey);

        if (Boolean.TRUE.equals(cooldownExists)) {
            throw new IllegalArgumentException("Please wait 60 seconds before requesting another OTP.");
        }
        String otp = generateOtp();
        String hashedOtp = passwordEncoder.encode(otp);
        String otpKey = "otp:login:" + email;
        redisTemplate.opsForValue().set(
            otpKey,
            hashedOtp,
            5,
            TimeUnit.MINUTES
        );

        // Prevent another resend for 60 seconds.
        redisTemplate.opsForValue().set(
            cooldownKey,
            "1",
            60,
            TimeUnit.SECONDS
        );
        emailService.sendOtp(email, otp);
    }
}
