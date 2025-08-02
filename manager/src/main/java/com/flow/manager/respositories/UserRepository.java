package com.flow.manager.respositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.flow.manager.Models.User;
import java.util.List;


public interface UserRepository extends MongoRepository<User,String> {
    public Optional<User> findById(String id);
    public Optional<User> findByName(String name);
    public Optional<User> findByEmail(String email);
    public boolean existsByEmail(String email);
    public boolean existsByName(String name);
}
