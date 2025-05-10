package com.example.api.rest.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.api.rest.Excepciones.ImagenesInvalido;
import com.example.api.rest.Excepciones.PropiedadDescripcionInvalida;
import com.example.api.rest.Excepciones.PropiedadNoEncontrada;
import com.example.api.rest.Excepciones.PropiedadSinComentarios;
import com.example.api.rest.Excepciones.PropiedadSinReportes;
import com.example.api.rest.Excepciones.PropiedadYaExistente;
import com.example.api.rest.Excepciones.PropiedadesCondicionesInvalida;
import com.example.api.rest.Excepciones.ValorCostoInvalido;

@ControllerAdvice
public class PropiedadadesControllerAdvice {
    @ExceptionHandler(PropiedadYaExistente.class)
    public ResponseEntity<String> propiedadYaExistente(PropiedadYaExistente mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PropiedadNoEncontrada.class)
    public ResponseEntity<String> propiedadNoEncontrada(PropiedadNoEncontrada mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PropiedadSinComentarios.class)
    public ResponseEntity<String> PropiedadSinComentarios(PropiedadSinComentarios mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PropiedadSinReportes.class)
    public ResponseEntity<String> PropiedadSinReportes(PropiedadSinReportes mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ValorCostoInvalido.class)
    public ResponseEntity<String> valorCostoImagen(ValorCostoInvalido mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ImagenesInvalido.class)
    public ResponseEntity<String> imagenesInvalido(ImagenesInvalido mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PropiedadDescripcionInvalida.class)
    public ResponseEntity<String> descripcionInvalida(PropiedadDescripcionInvalida mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PropiedadesCondicionesInvalida.class)
    public ResponseEntity<String> condicionesInvalida(PropiedadesCondicionesInvalida mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}
