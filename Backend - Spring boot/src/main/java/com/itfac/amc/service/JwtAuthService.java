package com.itfac.amc.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.itfac.amc.jwt.AuthenticationRequest;

public interface JwtAuthService {
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,HttpServletRequest request)
			throws Exception;
}
