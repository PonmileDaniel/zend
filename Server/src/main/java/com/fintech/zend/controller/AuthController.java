package com.fintech.zend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fintech.zend.dto.LoginRequest;
import com.fintech.zend.dto.LoginResponse;
import com.fintech.zend.dto.OtpResponse;
import com.fintech.zend.dto.SignupRequest;
import com.fintech.zend.dto.SignupResponse;
import com.fintech.zend.dto.TransactionPinRequest;
import com.fintech.zend.dto.VerifyOtpRequest;
import com.fintech.zend.security.SessionPrincipal;
import com.fintech.zend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Creates a new user account.
     * 
     * @param request the details of the user to be created
     * @return a response containing the username and account number of the created
     *         user, or an error message if the creation failed
     */
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request) {
        try {
            SignupResponse response = authService.signup(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException e) {
            SignupResponse response = new SignupResponse(e.getMessage(), null, null);
            return ResponseEntity.badRequest().body(response);

        }
    }

    /**
     * Logs in a user to the system.
     * 
     * @param request     the email or account number and password of the user to
     *                    log in
     * @param httpRequest the HTTP request used to log in
     * @return a response containing a successful login message if the login was
     *         successful, or an error message if the login failed
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {

        try {
            LoginResponse response = authService.login(request, httpRequest);
            return ResponseEntity.ok(response);

            // return ResponseEntity.ok(new LoginResponse("Login successful."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<OtpResponse> verifyOtp(@RequestBody VerifyOtpRequest request,
        HttpServletRequest httpRequest) {

            try {
                authService.verifyOtp(request.getEmail(), request.getOtp(), httpRequest);
                return ResponseEntity.ok(new OtpResponse("Account verified successfully."));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(new OtpResponse(e.getMessage()));
            }

    }

    /**
     * Creates a transaction PIN for a user.
     * 
     * @param request the request containing the transaction PIN
     * @param authentication the authentication details of the user
     * @return a ResponseEntity containing a successful message if the transaction PIN
     *         was created successfully, or an error message if the creation failed
     */
    @PostMapping("/transaction-pin")
    public ResponseEntity<String> createTransactionPin(@RequestBody TransactionPinRequest request,
            Authentication authentication) {

        try {
            SessionPrincipal principal = (SessionPrincipal) authentication.getPrincipal();
            authService.createTransactionPin(principal.getEmail(), request.getPin(), request.getConfirmPin());
            return ResponseEntity.ok("Transaction PIN created successfullly.");

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(e.getMessage());
        }

    }
}
