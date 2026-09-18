package com.fintech.zend.dto;
import com.fasterxml.jackson.annotation.JsonInclude;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse {

    private String message;
    private String challengeId;
    private String maskedEmail;

    public LoginResponse(String message) {
        this.message = message;
    }

    public LoginResponse(
            String message,
            String challengeId,
            String maskedEmail) {

        this.message = message;
        this.challengeId = challengeId;
        this.maskedEmail = maskedEmail;
    }

    public String getMessage() {
        return message;
    }

    public String getChallengeId() {
        return challengeId;
    }

    public String getMaskedEmail() {
        return maskedEmail;
    }
}