package com.example.api.rest.Excepciones;

public class TokenDeCreacionInvalido extends RuntimeException{
    public TokenDeCreacionInvalido(String mensaje){
        super(mensaje);
    }
}
