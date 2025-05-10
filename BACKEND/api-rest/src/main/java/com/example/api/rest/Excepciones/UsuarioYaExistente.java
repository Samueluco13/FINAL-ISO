package com.example.api.rest.Excepciones;

public class UsuarioYaExistente extends RuntimeException{
    public UsuarioYaExistente(String mensaje){
        super(mensaje);
    }
}
