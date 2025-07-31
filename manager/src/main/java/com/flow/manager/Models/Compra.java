package com.flow.manager.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

public class Compra {
    private LocalDateTime data;
    private Map<String,Double> produtos;
    private BigDecimal total;

    public Compra(){
        data = LocalDateTime.now();
    }

    public LocalDateTime getData() {
        return data;
    }
    public Map<String, Double> getProdutos() {
        return produtos;
    }
    public BigDecimal getTotal() {
        return total;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
    public void setProdutos(Map<String, Double> produtos) {
        this.produtos = produtos;
    }
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    public void SetProdutos(String key,Double value){
        produtos.put(key, value);
    }
    
}