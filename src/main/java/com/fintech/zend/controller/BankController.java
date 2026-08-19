package com.fintech.zend.controller;

import java.util.List;

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
import com.fintech.zend.security.SecurityUtils;
import com.fintech.zend.security.SessionPrincipal;
import com.fintech.zend.service.BankService;

@RestController
@RequestMapping("/api/accounts")

public class BankController {

    private final BankService bank;

    public BankController(BankService bank) {
        this.bank = bank;
    }
    /**
     * Transfer money from the authenticated user's account to another account.
     *
     * @param request a TransferRequest containing the details of the transfer
     * @return a ResponseEntity containing a successful transfer message if the transfer was successful, or an error message if the transfer failed
     */

    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest request) {
        try {
            SessionPrincipal user = SecurityUtils.getCurrentUser();
            String fromAccount = user.getAccountNumber();
            bank.transfer(fromAccount, request.getTo(), request.getAmount(), request.getDescription());
            return ResponseEntity.ok("Transfer successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("Transfer failed: " + e.getMessage());

        }
    }

    /**
     * Retrieve all bank accounts
     *
     * @return A ResponseEntity containing a List of BankAccount objects if the request was successful, or an error message if the request failed
     */
    @GetMapping
    public ResponseEntity<List<BankAccount>> getAllAccounts() {
        List<BankAccount> accounts = bank.getAccounts();
        return ResponseEntity.ok(accounts);
    }

    /**
     * Retrieves the statement of a bank account.
     * 
     * @param accountNumber the account number of the account to retrieve the statement for
     * @return a ResponseEntity containing the BankAccount object if the request was successful, or an error message if the request failed
     * 
     * @throws SecurityException if the authenticated user is not authorized to access the account
     */
    @GetMapping("/{accountNumber}/statement")
    public ResponseEntity<BankAccount> getStatement(@PathVariable String accountNumber) {
        SessionPrincipal user = SecurityUtils.getCurrentUser();
        if (!user.getAccountNumber().equals(accountNumber)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(bank.getStatement(accountNumber));
    }

    /**
     * Deposit money into a bank account
     * 
     * @param accountNumber the account number of the account to deposit into
     * @param request the details of the deposit
     * @return a ResponseEntity containing a successful deposit message if the deposit was successful, or an error message if the deposit failed
     * @throws SecurityException if the authenticated user is not authorized to access the account
     */
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

    /**
     * Retrieves the name of the holder of a bank account.
     * 
     * @param accountNumber the account number of the account to retrieve the holder name for
     * @return a ResponseEntity containing the name of the holder if the request was successful, or an error message if the request failed
     * 
     * @throws SecurityException if the authenticated user is not authorized to access the account
     */
    @GetMapping("/{accountNumber}/holder")
    public ResponseEntity<String> getAccountHolder(@PathVariable String accountNumber) {
        return ResponseEntity.ok(bank.getHolderName(accountNumber));
    }
}
