package com.example.api.rest.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.api.rest.Excepciones.AcuerdoCamposObligatoriosVacios;
import com.example.api.rest.Excepciones.AcuerdoCanceladoFinalizado;
import com.example.api.rest.Excepciones.AcuerdoCaracteres;
import com.example.api.rest.Excepciones.AcuerdoFechaFinalizacionFechaInicio;
import com.example.api.rest.Excepciones.AcuerdoFechaParaActualizar;
import com.example.api.rest.Excepciones.AcuerdoNoEncontrado;
import com.example.api.rest.Excepciones.AcuerdoNombreNoEncontrado;
import com.example.api.rest.Excepciones.AcuerdoPropiedadNoEncontrada;

@ControllerAdvice
public class AcuerdoControllerAdvice {
    
    @ExceptionHandler(AcuerdoCamposObligatoriosVacios.class)
    public ResponseEntity<String> AcuerdoCamposObligatoriosVacios(AcuerdoCamposObligatoriosVacios mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }
    
    @ExceptionHandler(AcuerdoCanceladoFinalizado.class)
    public ResponseEntity<String> AcuerdoCanceladoFinalizado(AcuerdoCanceladoFinalizado mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AcuerdoCaracteres.class)
    public ResponseEntity<String> AcuerdoCaracteres(AcuerdoCaracteres mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AcuerdoFechaFinalizacionFechaInicio.class)
    public ResponseEntity<String> AcuerdoFechaFinalizacionFechaInicio(AcuerdoFechaFinalizacionFechaInicio mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AcuerdoFechaParaActualizar.class)
    public ResponseEntity<String> AcuerdoFechaParaActualizar(AcuerdoFechaParaActualizar mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AcuerdoNoEncontrado.class)
    public ResponseEntity<String> AcuerdoNoEncontrado(AcuerdoNoEncontrado mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AcuerdoNombreNoEncontrado.class)
    public ResponseEntity<String> AcuerdoNombreNoEncontrado(AcuerdoNombreNoEncontrado mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AcuerdoPropiedadNoEncontrada.class)
    public ResponseEntity<String> AcuerdoPropiedadNoEncontrada(AcuerdoPropiedadNoEncontrada mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

}
