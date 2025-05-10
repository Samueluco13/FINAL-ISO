package com.example.api.rest.Excepciones;

public class UsuarioRecuperacionContraseña extends RuntimeException{
    public UsuarioRecuperacionContraseña(String mensaje){
        super(mensaje);
    }
}
