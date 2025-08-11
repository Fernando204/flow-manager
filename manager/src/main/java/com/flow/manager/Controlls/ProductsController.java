package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.Models.Products;
import com.flow.manager.respositories.ProductRepository;
import com.flow.manager.utils.Console;        

import java.util.List;

import org.springframework.data.repository.support.Repositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/get")
    public ResponseEntity<?> getProducts(@RequestParam String id) {
        List<Products> produtos = productRepository.findByUser(id); 
        if (produtos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum Produto Registrado");
        }
        return ResponseEntity.ok(produtos);
    }
    
    @PostMapping()
    public ResponseEntity<?> saveProduct(@RequestBody Products product) {
        if (productRepository.existsByNameAndUser(product.getName(),product.getUser())) {
            Console.error("Erro: Produto "+product.getName()+" já registrado!");
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("O Produto já está registrado");
        }
        productRepository.save(product);
        Console.success("sucesso ao registrar Produto: "+product.getName());
        return ResponseEntity.ok(product.getName()+" salvo com sucesso");
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletProduct(@PathVariable String id){
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
