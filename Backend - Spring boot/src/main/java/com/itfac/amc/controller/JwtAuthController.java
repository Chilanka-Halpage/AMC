package com.itfac.amc.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itfac.amc.jwt.AuthenticationRequest;
import com.itfac.amc.service.JwtAuthService;

@RestController
public class JwtAuthController {

	@Autowired
	JwtAuthService jwtAuthService;
	
	@RequestMapping("/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,HttpServletRequest request)
			throws Exception {
		return jwtAuthService.createAuthenticationToken(authenticationRequest,request);
	}

}
