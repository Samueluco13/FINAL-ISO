package com.example.api.rest.Excepciones;

public class AcuerdoCamposObligatoriosVacios extends RuntimeException {
    public AcuerdoCamposObligatoriosVacios(String mensaje){
        super(mensaje);
    }
}
