package com.fintech.zend.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    private SecurityUtils() {

    }

    public static SessionPrincipal getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException(
                "User is not authenticated"
            );  
        }
        Object principal = authentication.getPrincipal();

        if(!(principal instanceof SessionPrincipal)) {
            throw new IllegalStateException("Invalid authentication principal");
        }
        return (SessionPrincipal) principal;
    }
}
