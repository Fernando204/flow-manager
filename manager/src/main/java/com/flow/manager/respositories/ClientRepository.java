package com.flow.manager.respositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flow.manager.Models.Client;

public interface ClientRepository extends MongoRepository<Client,String> {
    public List<Client> findByName(String name);
    public List<Client> findByUser(String user);
} 
 