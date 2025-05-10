package com.example.api.rest.Excepciones;

public class FormatoContraseñaInvalida extends RuntimeException{
    public FormatoContraseñaInvalida(String mensaje){
        super(mensaje);
    }
}