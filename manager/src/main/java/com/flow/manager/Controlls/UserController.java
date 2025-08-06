package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.DTOs.LoginDTO;
import com.flow.manager.DTOs.UserDTO;
import com.flow.manager.Models.User;
import com.flow.manager.respositories.UserRepository;
import com.flow.manager.utils.Console;
import com.flow.manager.utils.JwtCookie;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/user")
@CrossOrigin("http://127.0.0.1:5500")
public class UserController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtCookie jwtCookie;

    public UserController(JwtCookie jwtCookie,UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtCookie = jwtCookie;
    }

    private void sendCookie(HttpServletResponse response, User user){
        String jwt = jwtCookie.generateToken(user);

        Cookie cookie = new Cookie("Jwt_token", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(604800);

        Console.log("Cookie enviado para: "+user.getName());
        response.addCookie(cookie);
        response.setHeader("Set-Cookie", "Jwt_token=" + jwt + "; HttpOnly; Path=/; Max-Age=604800");

    }

    @PostMapping("/register")
    public ResponseEntity<?> userRegisterMethod(@RequestBody User user,HttpServletResponse response) {
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
        sendCookie(response, user);
        Console.success("Usuário: "+user.getName()+" Registrado com sucesso");
        UserDTO responseDTO = new UserDTO(user.getName(), user.getId(), user.getRegisterDate());
        return ResponseEntity.ok(responseDTO);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginMethod(@RequestBody LoginDTO request, HttpServletResponse response) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não registrado");
        }
        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Senha Incorreta");
        }

        sendCookie(response, user);
        UserDTO dto = new UserDTO(user.getName(), user.getId(), user.getRegisterDate());
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping("/session")
    public ResponseEntity<?> getSession(HttpServletRequest response) {
        Cookie[] cookies = response.getCookies();
        if (cookies != null) {
            for(Cookie cookie : cookies){
                if ("Jwt_token".equals(cookie.getName())) {
                    try{
                        String userId = jwtCookie.validadeAndGetId(cookie.getValue());
                        Optional<User> optionalUser = userRepository.findById(userId);

                        User user = optionalUser.get();

                        UserDTO dto = new UserDTO(user.getName(), user.getId(), user.getRegisterDate());
                        Console.success("Token validado com sucesso");
                        return ResponseEntity.status(HttpStatus.ACCEPTED).body(dto);
                    }catch(Exception ex){
                        ex.printStackTrace();
                        Console.error("erro ao validadar o token");
                    }
                }
            }
        }
        Console.error("Erro: nenhum token encontrado");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não logado por favor faça login");
    }
    
    @GetMapping("/logout")
    public ResponseEntity<?> getMethodName(HttpServletResponse response) {
        try{
            Cookie cookie = new Cookie("Jwt_token", null);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(0);
    
            response.addCookie(cookie);
            
            Console.log("Usuário deslogado com sucesso");
            return ResponseEntity.ok("logout realizado com sucesso");
        }catch(Exception ex){
            ex.printStackTrace();
            return ResponseEntity.internalServerError().body("Erro ao realizar o logout");
        }
    }   
    

}
