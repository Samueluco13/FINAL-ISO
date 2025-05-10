package com.example.api.rest.Excepciones;

public class ActualizacionUsuarioNombreVacio extends RuntimeException {
    public ActualizacionUsuarioNombreVacio(String mensaje){
        super(mensaje);
    }
}