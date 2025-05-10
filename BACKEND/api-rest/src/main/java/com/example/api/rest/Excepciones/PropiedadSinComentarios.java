package com.example.api.rest.Excepciones;

public class PropiedadSinComentarios extends RuntimeException{
    public PropiedadSinComentarios(String mensaje){
        super(mensaje);
    }
}
