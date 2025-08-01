package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.Models.Products;
import com.flow.manager.respositories.ProductRepository;
import com.flow.manager.utils.Console;        

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/products")
@CrossOrigin("http://127.0.0.1:5500")
public class ProductsController {
    private final ProductRepository productRepository;

    public ProductsController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @GetMapping()
    public ResponseEntity<?> getProducts() {
        List<Products> produtos = productRepository.findAll(); 
        if (produtos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum Produto Registrado");
        }
        return ResponseEntity.ok(produtos);
    }
    
    @PostMapping()
    public ResponseEntity<?> saveProduct(@RequestBody Products product) {
        List<Products> produtos = productRepository.findAll();
        if (produtos.contains(product)) {
            Console.error("Erro: Produto "+product.getName()+" já registrado!");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("O Produto já está registrado");
        }
        productRepository.save(product);
        Console.success("sucesso ao registrar Produto: "+product.getName());
        return ResponseEntity.ok(product.getName()+" salvo com sucesso");
    }
    
}
