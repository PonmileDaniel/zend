package com.fintech.zend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fintech.zend.dto.CreateAccountRequest;
import com.fintech.zend.dto.DepositRequest;
import com.fintech.zend.dto.TransferRequest;
import com.fintech.zend.model.BankAccount;
import com.fintech.zend.service.BankService;

@RestController
@RequestMapping("/api/accounts")

public class BankController {

    private final BankService bank;

    public BankController(BankService bank) {
        this.bank = bank;
    }

    @PostMapping
    public ResponseEntity<String> createAccount(@RequestBody CreateAccountRequest request) {
        bank.createAccount(request.getHolderName());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Account created for " + request.getHolderName());
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
        try {
            bank.transfer(request.getFrom(), request.getTo(), request.getAmount());
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
        return ResponseEntity.ok(bank.getStatement(accountNumber));
    }

    @PostMapping("/{accountNumber}/deposit")
    public ResponseEntity<String> deposit(@PathVariable String accountNumber, @RequestBody DepositRequest request) {
        bank.deposit(accountNumber, request.getAmount());
        return ResponseEntity.ok("Deposited " + request.getAmount() + " to " + accountNumber);
    }

    @GetMapping("/{accountNumber}/holder")
    public ResponseEntity<String> getAccountHolder(@PathVariable String accountNumber) {
        return ResponseEntity.ok(bank.getHolderName(accountNumber));
    }
}
