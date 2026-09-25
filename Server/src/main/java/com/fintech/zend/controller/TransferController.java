package com.fintech.zend.controller;

import com.fintech.zend.dto.RecipientResponse;
import com.fintech.zend.service.TransferService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

}
