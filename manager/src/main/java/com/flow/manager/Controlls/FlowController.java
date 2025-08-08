package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flow.manager.Models.Client;
import com.flow.manager.Models.Compra;
import com.flow.manager.respositories.ClientRepository;
import com.flow.manager.utils.Console;
import com.flow.manager.DTOs.CompraDTO;
import com.flow.manager.DTOs.ProductDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



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
            if (clientRepository.existsByNameAndUser(cliente.getName(), cliente.getUser())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("O Cliente já está cadastrado");
            }
            clientRepository.save(cliente);
            Console.success("Sucesso ao registrar CLiente: "+cliente.getName());
            return ResponseEntity.ok("cliente registrado com sucesso");
        }catch(Exception ex){
            ex.printStackTrace();
            Console.error("Erro ao registrar Cliente");;
            return ResponseEntity.badRequest().body("Erro ao registrar Cliente");
        }
    }

    @PostMapping("/client/compra")
    public ResponseEntity<?> putMethodName(@RequestBody CompraDTO compraRequest) {
        Optional<Client> optionalClient = clientRepository.findById(compraRequest.getCliente());
        if (optionalClient.isEmpty()) {//verifica se o cliente existe
            return ResponseEntity.badRequest().body("Cliente Não Registrado");
        }
        Client client = optionalClient.get();
        Compra compra = new Compra();//inicia um novo objeto de compra

        BigDecimal total = new BigDecimal(0);//para guardar o valor total da compra
        for(ProductDTO dto : compraRequest.getProdutos()){
            total = total.add(new BigDecimal(dto.getTotal()));
            System.out.println(String.valueOf(total));
        }
        compra.setTotal(total);
        compra.setFormaDePagamento(compraRequest.getFormaDePagamento());
        compra.setProdutos(compraRequest.getProdutos());

        List<Compra> listaDeCompras = client.getCompraList();
        listaDeCompras.add(compra);
        client.setCompraList(listaDeCompras);

        clientRepository.save(client);
        
        return ResponseEntity.ok("Compra salva com sucesso");
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
