package com.example.api.rest.Excepciones;

public class UsuarioCredencialesIncorrectas extends RuntimeException {
    public UsuarioCredencialesIncorrectas(String mensaje){
        super(mensaje);
    }
}
