package com.flow.manager.DTOs;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class UserDTO {
    private String name;
    private String id;
    private String data;

    public UserDTO(String name,String id,LocalDateTime time){
        this.name = name;
        this.id = id;

        DateTimeFormatter formater = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        this.data = time.format(formater);
    }
    public UserDTO(String name,String id,String data){
        this.name = name;
        this.id = id;
        this.data = data;
    }

    public String getData() {
        return data;
    }
    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setData(String data) {
        this.data = data;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }

}
