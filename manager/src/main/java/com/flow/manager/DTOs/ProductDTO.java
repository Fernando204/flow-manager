package com.flow.manager.DTOs;

public class ProductDTO {
    private String name;
    private double price;
    private double total;
    private String id;
    private double quantidade;

    public ProductDTO(String name,double price,double quantidade,String id,double total){
        this.name = name;
        this.id = id;
        this.quantidade = quantidade;
        this.price = price;
        this.total = total;
    }
    public String getName() {
        return name;
    }
    public double getPrice() {
        return price;
    }
    public double getQuantidade() {
        return quantidade;
    }
    public double getTotal() {
        return total;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public void setQuantidade(double quantidade) {
        this.quantidade = quantidade;
    }
    public void setTotal(double total) {
        this.total = total;
    }
}
