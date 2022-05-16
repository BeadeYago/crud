package com.example.crud.handler;

import com.example.crud.dto.ErrorDto;
import com.example.crud.exception.BusinessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(value = BusinessException.class)
    public ResponseEntity<ErrorDto> businessExceptionHandler(BusinessException ex){
        ErrorDto error = ErrorDto.builder().code(ex.getCode()).message(ex.getMessage()).build();
        return new ResponseEntity<>(error, ex.getStatus());
    }
}
