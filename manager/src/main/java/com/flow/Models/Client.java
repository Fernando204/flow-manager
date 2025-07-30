package com.flow.Models;

import java.time.LocalDateTime;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Client {

    @Id
    private String id;

    private String name;
    private String CPF;
    private long phone;
    private LocalDateTime date;

    public Client(String name,String CPF,long phone){
        this.name = name;
        this.CPF = CPF;
        this.phone = phone;
        this.date = LocalDateTime.now();
    }

    public String getCPF() {
        return CPF;
    }
    public LocalDateTime getDate() {
        return date;
    }
    public String getName() {
        return name;
    }
    public long getPhone() {
        return phone;
    }
    
}