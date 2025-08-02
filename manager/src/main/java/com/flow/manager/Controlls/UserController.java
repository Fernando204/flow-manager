package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.DTOs.LoginDTO;
import com.flow.manager.DTOs.UserDTO;
import com.flow.manager.Models.User;
import com.flow.manager.respositories.UserRepository;
import com.flow.manager.utils.Console;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
@CrossOrigin("http://127.0.0.1:5500")
public class UserController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> userRegisterMethod(@RequestBody User user) {
        if (userRepository.existsByName(user.getName())) {
            Console.error("Usuário já registrado");
            return ResponseEntity.badRequest().body("Usuário já registrado");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            Console.error("este Email já está em uso");
            return ResponseEntity.badRequest().body("Este Email já está em uso");
        }

        String newPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(newPassword);

        user.setRegisterDate(LocalDateTime.now());

        userRepository.save(user);
        Console.success("Usuário: "+user.getName()+" Registrado com sucesso");
        UserDTO response = new UserDTO(user.getName(), user.getId(), user.getRegisterDate());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginMethod(@RequestBody LoginDTO request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não registrado");
        }
        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Senha Incorreta");
        }

        UserDTO dto = new UserDTO(user.getName(), user.getId(), user.getRegisterDate());
        return ResponseEntity.ok(dto);
    }
    

}
