package com.example.api.rest.Excepciones;

public class UsuarioBloqueado extends RuntimeException{
    public UsuarioBloqueado(String mensaje){
        super(mensaje);
    }
}
