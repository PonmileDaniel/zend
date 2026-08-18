package com.fintech.zend.controller;

import java.util.List;

import org.apache.catalina.security.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fintech.zend.dto.DepositRequest;
import com.fintech.zend.dto.TransferRequest;
import com.fintech.zend.model.BankAccount;
import com.fintech.zend.service.BankService;
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;

@RestController
@RequestMapping("/api/accounts")

public class BankController {

    private final BankService bank;

    public BankController(BankService bank) {
        this.bank = bank;
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
        try {
            SessionPrincipal user = SecurityUtils.getCurrentUser();
            String fromAccount = user.getAccountNumber();
            bank.transfer(fromAccount, request.getTo(), request.getAmount());
            return ResponseEntity.ok("Transfer successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Transfer failed: " + e.getMessage());

        }
    }

    @GetMapping
    public ResponseEntity<List<BankAccount>> getAllAccounts() {
        List<BankAccount> accounts = bank.getAccounts();
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{accountNumber}/statement")
    public ResponseEntity<BankAccount> getStatement(@PathVariable String accountNumber) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();
        if (!user.getAccountNumber().equals(accountNumber)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(bank.getStatement(accountNumber));
    }

    @PostMapping("/{accountNumber}/deposit")
    public ResponseEntity<String> deposit(@PathVariable String accountNumber, @RequestBody DepositRequest request) {
        try {
            bank.deposit(accountNumber, request.getAmount());
            return ResponseEntity.ok("Deposited " + request.getAmount() + " to " + accountNumber);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{accountNumber}/holder")
    public ResponseEntity<String> getAccountHolder(@PathVariable String accountNumber) {
        return ResponseEntity.ok(bank.getHolderName(accountNumber));
    }
}
