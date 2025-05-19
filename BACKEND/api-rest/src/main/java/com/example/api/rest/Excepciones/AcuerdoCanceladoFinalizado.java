package com.example.api.rest.Excepciones;

public class AcuerdoCanceladoFinalizado extends RuntimeException {
    public AcuerdoCanceladoFinalizado(String mensaje){
        super(mensaje);
    }
    
}
