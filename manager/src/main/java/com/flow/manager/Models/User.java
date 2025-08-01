package com.flow.manager.Models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;
    
    @CreatedDate
    private LocalDateTime registerDate;

    public User(){}
    public User(String name,String email,String password){
        this.password = password;
        this.name = name;
        this.email = email;

        this.registerDate = LocalDateTime.now();
    }

    public String getEmail() {
        return email;
    }
    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getPassword() {
        return password;
    }
    public LocalDateTime getRegisterDate() {
        return registerDate;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setRegisterDate(LocalDateTime registerDate) {
        this.registerDate = registerDate;
    }


}
