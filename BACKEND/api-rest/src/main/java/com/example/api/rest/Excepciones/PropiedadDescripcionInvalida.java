package com.example.api.rest.Excepciones;

public class PropiedadDescripcionInvalida extends RuntimeException{
    public PropiedadDescripcionInvalida(String mensaje){
        super(mensaje);
    }
}