package com.example.api.rest.Excepciones;

public class AcuerdoPropiedadNoEncontrada extends RuntimeException {
    public AcuerdoPropiedadNoEncontrada(String mensaje){
        super(mensaje);
    }
    
}
