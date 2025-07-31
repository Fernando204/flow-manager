package com.flow.manager.Models;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;

@Document(collection = "products")
public class Products {
    @Id
    private String id;

    private String name;
    private double price;
    private String medida;

    private LocalDateTime dataDeRegistro;

    public Products(String name,double price,String medida){
        this.price = price;
        this.name = name;
        this.medida = medida;
        

        this.dataDeRegistro = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }
    
    public String getMedida() {
        return medida;
    }
    public LocalDateTime getDataDeRegistro() {
        return dataDeRegistro;
    }
    public String getName() {
        return name;
    }
    public double getPrice() {
        return price;
    }

  
    public void setMedida(String medida) {
        this.medida = medida;
    }
    public void setDataDeRegistro(LocalDateTime dataDeRegistro) {
        this.dataDeRegistro = dataDeRegistro;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPrice(double price) {
        this.price = price;
    }
}
