package com.itfac.amc.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class JwtException extends RuntimeException {

	private static final long serialVersionUID = -1242200027151299452L;

	public JwtException() {
		super();
	}

	public JwtException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public JwtException(String message, Throwable cause) {
		super(message, cause);
	}

	public JwtException(String message) {
		super(message);
	}

	public JwtException(Throwable cause) {
		super(cause);
	}

	

	
}
