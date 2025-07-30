package com.flow.manager.Controlls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/flow")
public class FlowController {
    @PostMapping("/client/register")
    public String clientRegister(@RequestBody String entity) {
        //TODO: process POST request
        
        return entity;
    }
    
    
}
