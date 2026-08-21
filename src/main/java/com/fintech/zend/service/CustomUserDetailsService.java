package com.fintech.zend.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fintech.zend.config.CustomUserDetails;
import com.fintech.zend.model.User;
import com.fintech.zend.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    public CustomUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * Loads a user by their email or account number.
     * 
     * @param login the email or account number of the user
     * @return a CustomUserDetails object containing the user's details
     * @throws UsernameNotFoundException if the user is not found, or if their account is not fully configured
     */
    @Override
    public UserDetails loadUserByUsername(String login)
            throws UsernameNotFoundException {

        User user = repository.findByEmail(login)
                .or(() -> repository.findByBankAccount_AccountNumber(login))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user.getBankAccount() == null) {
            throw new UsernameNotFoundException("User account is not fully configured");
        }

        return new CustomUserDetails(
                user.getId(),
                user.getEmail(),
                user.getBankAccount().getAccountNumber(),
                user.getPassword());
    }
}
