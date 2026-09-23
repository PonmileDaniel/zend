package com.fintech.zend.dto;

public class RecipientResponse {
    private String firstName;
    private String lastName;

    public RecipientResponse() {
    }

    public RecipientResponse(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

}
