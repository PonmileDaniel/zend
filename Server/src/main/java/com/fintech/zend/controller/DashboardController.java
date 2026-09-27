package com.fintech.zend.controller;

import com.fintech.zend.dto.dashboard.DashboardResponse;
import com.fintech.zend.dto.pin.TransactionPinRequest;
import com.fintech.zend.dto.pin.TransactionPinResponse;
import com.fintech.zend.security.SessionPrincipal;
import com.fintech.zend.service.DashboardService;
import org.springframework.security.core.Authentication;
import com.fintech.zend.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;
    private final AuthService authService;

    public DashboardController(DashboardService dashboardService, AuthService authService) {
        this.dashboardService = dashboardService;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboard());
    }

    /**
     * Creates a transaction PIN for a user.
     * 
     * @param request        the request containing the transaction PIN
     * @param authentication the authentication details of the user
     * @return a ResponseEntity containing a successful message if the transaction
     *         PIN
     *         was created successfully, or an error message if the creation failed
     */
    @PostMapping("/transaction-pin")
    public ResponseEntity<TransactionPinResponse> createTransactionPin(@RequestBody TransactionPinRequest request,
            Authentication authentication) {

        try {
            SessionPrincipal principal = (SessionPrincipal) authentication.getPrincipal();
            authService.createTransactionPin(principal.getEmail(), request.getPin(), request.getConfirmPin());
            return ResponseEntity.ok(new TransactionPinResponse("Transaction PIN created successfullly."));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new TransactionPinResponse(e.getMessage()));
        }

    }
}
