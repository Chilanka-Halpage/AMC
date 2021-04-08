package com.itfac.amc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.jwt.AuthenticationRequest;
import com.itfac.amc.service.JwtAuthService;

@RestController
@CrossOrigin("*")
public class JwtAuthController {

	@Autowired
	JwtAuthService jwtAuthService;
	
	@RequestMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		return jwtAuthService.createAuthenticationToken(authenticationRequest);
	}

}
