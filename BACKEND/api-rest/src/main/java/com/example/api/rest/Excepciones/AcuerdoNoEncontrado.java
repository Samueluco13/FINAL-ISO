package com.example.api.rest.Excepciones;

public class AcuerdoNoEncontrado extends RuntimeException {
    public AcuerdoNoEncontrado(String mensaje){
        super (mensaje);
    }
    
}
