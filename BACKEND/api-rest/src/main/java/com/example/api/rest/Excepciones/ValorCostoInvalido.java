package com.example.api.rest.Excepciones;

public class ValorCostoInvalido extends RuntimeException{
    public ValorCostoInvalido(String mensaje){
        super(mensaje);
    }
}