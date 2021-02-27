package com.itfac.amc.jwt;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationResponse {
	private final String userId;
	private final String username;
	private final String jwt;
	private final String role;

	public String getJwt() {
		return jwt;
	}

	public String getRole() {
		return role;
	}

	public String getUserId() {
		return userId;
	}

	public String getUsername() {
		return username;
	}

}
