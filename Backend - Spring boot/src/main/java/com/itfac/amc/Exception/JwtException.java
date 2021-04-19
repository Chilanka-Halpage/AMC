package com.itfac.amc.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class JwtException extends ExpiredJwtException {

	private static final long serialVersionUID = -1242200027151299452L;

	public JwtException(Header<?> header, Claims claims, String message) {
		super(header, claims, message);

	}

	
}
