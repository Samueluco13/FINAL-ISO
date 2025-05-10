package com.example.api.rest.Excepciones;

public class PaginaNoEncontrada extends RuntimeException {
    public PaginaNoEncontrada(String mensaje){
        super(mensaje);
    }
}