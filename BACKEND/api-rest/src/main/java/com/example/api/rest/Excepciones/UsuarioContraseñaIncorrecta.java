package com.example.api.rest.Excepciones;

public class UsuarioContraseñaIncorrecta extends RuntimeException{
    public UsuarioContraseñaIncorrecta(String mensaje){
        super(mensaje);
    }
}
