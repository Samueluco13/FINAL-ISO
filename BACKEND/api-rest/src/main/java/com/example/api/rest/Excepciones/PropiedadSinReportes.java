package com.example.api.rest.Excepciones;

public class PropiedadSinReportes extends RuntimeException {
    public PropiedadSinReportes(String mensaje){
        super(mensaje);
    }
}
