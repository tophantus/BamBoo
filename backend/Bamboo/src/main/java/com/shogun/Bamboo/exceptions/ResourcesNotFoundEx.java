package com.shogun.Bamboo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourcesNotFoundEx extends RuntimeException {
    public ResourcesNotFoundEx(String message) {
        super(message);
    }
    public ResourcesNotFoundEx(String message, Throwable cause) {
        super(message, cause);
    }
}
