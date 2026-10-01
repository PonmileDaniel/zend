package com.fintech.zend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling 
public class ZendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZendApplication.class, args);
	}
}
