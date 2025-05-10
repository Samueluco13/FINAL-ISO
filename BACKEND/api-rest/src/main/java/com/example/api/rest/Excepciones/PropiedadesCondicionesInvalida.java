package com.example.api.rest.Excepciones;

public class PropiedadesCondicionesInvalida extends RuntimeException{
    public PropiedadesCondicionesInvalida(String mensaje){
        super(mensaje);
    }
}