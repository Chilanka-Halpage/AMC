package com.itfac.amc.service.impl;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.itfac.amc.jwt.AuthenticationRequest;
import com.itfac.amc.jwt.AuthenticationResponse;
import com.itfac.amc.jwt.JwtUtil;
import com.itfac.amc.security.MyUserDetails;
import com.itfac.amc.security.MyUserDetailsService;
import com.itfac.amc.service.JwtAuthService;
import com.itfac.amc.service.LoginDetailsService;

@Service
public class JwtAuthServiceImpl implements JwtAuthService {
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	MyUserDetailsService userDetailsService;
	@Autowired
	LoginDetailsService loginDetailsService;
	
	@Autowired
	JwtUtil jwtUtil;

	@Override
	public ResponseEntity<?> createAuthenticationToken(AuthenticationRequest authenticationRequest,HttpServletRequest request) throws Exception {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserId(),
				authenticationRequest.getPassword()));

		MyUserDetails userDetails = (MyUserDetails) userDetailsService
				.loadUserByUsername(authenticationRequest.getUserId());
		String jwt = jwtUtil.generateToken(userDetails);
		String userId = userDetails.getUserId();
		String username = userDetails.getUsername();
		String role = userDetails.getAuthorities().stream().map(r -> r.getAuthority()).findFirst().orElse("NULL");
		loginDetailsService.loginDetails(request,userId);
		return ResponseEntity.ok(new AuthenticationResponse(userId, username, jwt, role));
	}

}
