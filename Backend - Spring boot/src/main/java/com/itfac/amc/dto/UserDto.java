package com.itfac.amc.dto;

import org.springframework.stereotype.Component;

@Component
public interface UserDto {
	
	String getUname(); 
	String getEmail();
	String getContactNo();
	
}


