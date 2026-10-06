package com.fintech.zend.controller;

import com.fintech.zend.dto.RecipientResponse;
import com.fintech.zend.dto.TransferRequest;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;
import com.fintech.zend.service.TransferService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {
    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @GetMapping("/recipient")
    public ResponseEntity<RecipientResponse> getRecipient(
            @RequestParam String accountNumber) {

        RecipientResponse recipient = transferService.findRecipient(accountNumber);

        return ResponseEntity.ok(recipient);
    }

    /**
     * Transfer money from the authenticated user's account to another account.
     *
     * @param request a TransferRequest containing the details of the transfer
     * @return a ResponseEntity containing a successful transfer message if the
     *         transfer was successful, or an error message if the transfer failed
     */

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
        try {
            SessionPrincipal user = SecurityUtils.getCurrentUser();
            String fromAccount = user.getAccountNumber();
            transferService.transfer(fromAccount, request.getTo(), request.getAmount(), request.getDescription(),
                    request.getPin());
            return ResponseEntity.ok("Transfer successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Transfer failed: " + e.getMessage());
        }
    }

}
