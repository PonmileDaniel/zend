package com.fintech.zend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
    
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtp(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Your Zend verification Code");
        message.setText(
            "Your ZEND verification code is: " + otp
                        + "\n\n"
                        + "This code will expire in 5 minutes."
                        + "\n\n"
                        + "If you did not create a ZEND account, please ignore this email."
        );
        mailSender.send(message);
    }
}