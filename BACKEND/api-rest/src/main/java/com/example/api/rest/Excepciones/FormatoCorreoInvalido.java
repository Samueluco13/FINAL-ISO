package com.example.api.rest.Excepciones;

public class FormatoCorreoInvalido extends RuntimeException{
    public FormatoCorreoInvalido(String mensaje){
        super(mensaje);
    }
}