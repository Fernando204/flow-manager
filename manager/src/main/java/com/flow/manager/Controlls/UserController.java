package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.DTOs.UserDTO;
import com.flow.manager.Models.User;
import com.flow.manager.respositories.UserRepository;
import com.flow.manager.utils.Console;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
@CrossOrigin("http://127.0.0.1:5500")
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> userRegisterMethod(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByName(user.getName());
        Optional<User> optionalUser2 = userRepository.findByName(user.getEmail());
        if (!optionalUser.isEmpty()) {
            Console.error("Usuário já registrado");
            return ResponseEntity.badRequest().body("Usuário já registrado");
        }
        if (!optionalUser2.isEmpty()) {
            Console.error("este Email já está em uso");
            return ResponseEntity.badRequest().body("Este Email já está em uso");
        }

        userRepository.save(user);
        Console.success("Usuário: "+user.getName()+" Registrado com sucesso");
        Console.log(String.valueOf(user.getRegisterDate()));
        UserDTO response = new UserDTO(user.getName(), user.getId(), user.getRegisterDate());
        return ResponseEntity.ok(response);
    }
    

}
