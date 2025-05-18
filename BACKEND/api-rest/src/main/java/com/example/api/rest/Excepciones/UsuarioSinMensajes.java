package com.example.api.rest.Excepciones;

public class UsuarioSinMensajes extends RuntimeException{
    public UsuarioSinMensajes(String mensaje){
        super(mensaje);
    }
}
