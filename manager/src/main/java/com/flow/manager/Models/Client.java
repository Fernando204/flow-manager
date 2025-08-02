package com.flow.manager.Models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
public class Client {

    @Id
    private String id;

    private String name;
    private String CPF;
    private long phone;
    private LocalDateTime date;
    private String user;

    private List<Compra> compraList = new ArrayList<>();

    public Client(String name,String CPF,long phone){
        this.name = name;
        this.CPF = CPF;
        this.phone = phone;
        this.date = LocalDateTime.now();
    }

    public String getUser() {
        return user;
    }
    public String getId() {
        return id;
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
    public List<Compra> getCompraList() {
        return compraList;
    }

    public void setUser(String user) {
        this.user = user;
    }
    public void setCPF(String cPF) {
        CPF = cPF;
    }
    public void setCompraList(List<Compra> compraList) {
        this.compraList = compraList;
    }
    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPhone(long phone) {
        this.phone = phone;
    }
    
}