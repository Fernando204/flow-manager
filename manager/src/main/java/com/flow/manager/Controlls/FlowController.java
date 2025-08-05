package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.Models.Client;
import com.flow.manager.respositories.ClientRepository;
import com.flow.manager.utils.Console;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


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
        try{
            clientRepository.save(cliente);
            Console.success("Sucesso ao registrar CLiente: "+cliente.getName());
            return ResponseEntity.ok("cliente registrado com sucesso");
        }catch(Exception ex){
            ex.printStackTrace();
            Console.error("Erro ao registrar Cliente");;
            return ResponseEntity.badRequest().body("Erro ao registrar Cliente");
        }
    }

    @GetMapping("/client/get")
    public ResponseEntity<?> getClients(@RequestParam String id){
        List<Client> clientes = clientRepository.findByUser(id);
        if (clientes.isEmpty()) {
            Console.error("nenhum cliente registrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhum Cliente Registrado");
        }
        Console.success("Lista de clientes recuperada");
        return ResponseEntity.ok(clientes);
    }
    
    
    
}
