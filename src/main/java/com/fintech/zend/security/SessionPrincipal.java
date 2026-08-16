package com.fintech.zend.security;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class SessionPrincipal implements Serializable {

    private static final long serialVersionUID = 1L;

    private final Long id;
    private final String email;
    private final String accountNumber;
    private final Collection<? extends GrantedAuthority> authorities;

    public SessionPrincipal(
            Long id,
            String email,
            String accountNumber) {

        this.id = id;
        this.email = email;
        this.accountNumber = accountNumber;
        this.authorities = List.of(
                new SimpleGrantedAuthority("ROLE_USER"));
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}