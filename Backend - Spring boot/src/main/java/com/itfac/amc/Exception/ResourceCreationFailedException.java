package com.itfac.amc.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
public class ResourceCreationFailedException extends RuntimeException {

	private static final long serialVersionUID = -9217953728633669156L;

	public ResourceCreationFailedException() {
		super();
	}

	public ResourceCreationFailedException(String message) {
		super(message);
	}
	
	public ResourceCreationFailedException(String message, Throwable cause) {
        super(message, cause);
    }

}
