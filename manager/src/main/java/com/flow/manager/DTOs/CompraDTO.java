package com.flow.manager.DTOs;

import java.util.List;
import java.util.Map;

public class CompraDTO {
    private String cliente;
    private String formaDePagamento;
    private List<ProductDTO> produtos;

    public CompraDTO(String cliente , List<ProductDTO> produtos,String formaDePagamento){
        this.cliente = cliente;
        this.produtos = produtos;
        this.formaDePagamento = formaDePagamento;
    }

    public List<ProductDTO> getProdutos() {
        return produtos;
    }
    public void setProdutos(List<ProductDTO> produtos) {
        this.produtos = produtos;
    }
    public String getCliente() {
        return cliente;
    }

    public String getFormaDePagamento() {
        return formaDePagamento;
    }
    public void setFormaDePagamento(String formaDePagamento) {
        this.formaDePagamento = formaDePagamento;
    }
    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    
}
