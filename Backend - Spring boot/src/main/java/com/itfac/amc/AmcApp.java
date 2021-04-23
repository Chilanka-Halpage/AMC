package com.itfac.amc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@SpringBootApplication
public class AmcApp {

	public static void main(String[] args) {
		SpringApplication.run(AmcApp.class, args);
	}

}
