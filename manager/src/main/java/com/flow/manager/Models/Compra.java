package com.flow.manager.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import com.flow.manager.DTOs.ProductDTO;

public class Compra {
    private String formaDePagamento;
    private LocalDateTime data;
    private List<ProductDTO>produtos;
    private BigDecimal total;

    public Compra(){
        data = LocalDateTime.now();
    }

    public String getFormaDePagamento() {
        return formaDePagamento;
    }
    public void setFormaDePagamento(String formaDePagamento) {
        this.formaDePagamento = formaDePagamento;
    }
    public LocalDateTime getData() {
        return data;
    }
    public List<ProductDTO> getProdutos() {
        return produtos;
    }
    public BigDecimal getTotal() {
        return total;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }
    public void setProdutos(List<ProductDTO> produtos) {
        this.produtos = produtos;
    }
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    
}