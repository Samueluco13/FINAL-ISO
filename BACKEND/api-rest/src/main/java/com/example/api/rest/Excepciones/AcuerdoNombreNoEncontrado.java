package com.example.api.rest.Excepciones;

public class AcuerdoNombreNoEncontrado extends RuntimeException {
    public AcuerdoNombreNoEncontrado(String mensaje){
        super(mensaje);
    }
}
