package com.example.api.rest.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.api.rest.Excepciones.UsuarioSinMensajes;

@ControllerAdvice
public class ChatsControllerAdvice {
    
    @ExceptionHandler(UsuarioSinMensajes.class)
    public ResponseEntity<String> usuarioSinMensajes(UsuarioSinMensajes mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}
