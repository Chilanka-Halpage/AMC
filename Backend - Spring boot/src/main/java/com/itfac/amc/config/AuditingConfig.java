package com.itfac.amc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import com.itfac.amc.util.AuditorAwareImpl;

@Configuration
public class AuditingConfig {

	@Bean
    public AuditorAware<String> auditorAware() {
        return new AuditorAwareImpl();
    }
}
