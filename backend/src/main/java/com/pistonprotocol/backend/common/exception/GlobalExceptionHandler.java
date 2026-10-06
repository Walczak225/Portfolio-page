package com.pistonprotocol.backend.common.exception;

import com.pistonprotocol.backend.common.errorsDto.ErrorDescription;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorDescription> handleNotFoundException(NotFoundException ex) {
        ErrorDescription error = new ErrorDescription(
                ex.getMessage(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now().toString()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorDescription> handleConflictException(ConflictException ex) {
        ErrorDescription error = new ErrorDescription(
                ex.getMessage(),
                HttpStatus.CONFLICT.value(),
                LocalDateTime.now().toString()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }
}