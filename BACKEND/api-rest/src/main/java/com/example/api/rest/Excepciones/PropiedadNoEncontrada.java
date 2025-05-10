package com.example.api.rest.Excepciones;

public class PropiedadNoEncontrada extends RuntimeException{
    public PropiedadNoEncontrada(String mensaje){
        super(mensaje);
    }
}
