package com.example.api.rest.Excepciones;

public class PropiedadYaExistente extends RuntimeException{
    public PropiedadYaExistente(String mensaje){
        super(mensaje);
    }
}
