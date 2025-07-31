package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.Models.Client;
import com.flow.manager.respositories.ClientRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/flow")
@CrossOrigin("http://127.0.0.1:5500") 
public class FlowController {
    private ClientRepository clientRepository; 

    public FlowController(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }

    @PostMapping("/client/register")
    public ResponseEntity<?> clientRegister(@RequestBody Client cliente) {
        clientRepository.save(cliente);
        
        return ResponseEntity.ok("cliente registrado com sucesso");
    }
    
    
}
