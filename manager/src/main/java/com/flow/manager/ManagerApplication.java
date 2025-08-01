package com.flow.manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.flow.manager.utils.Console;

@SpringBootApplication
public class ManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManagerApplication.class, args);

		try{
			Thread.sleep(3000);
			Console.log("Servidor iniciado");
		}catch(InterruptedException ex){
			ex.printStackTrace();
		}
	}

}
