package com.flow.manager.respositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flow.manager.Models.Products;

public interface ProductRepository extends MongoRepository<Products,String> {
    public List<Products> findByName(String name);
}
