package com.example.api.rest.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.api.rest.Excepciones.ActualizacionUsuarioFormatoTelefono;
import com.example.api.rest.Excepciones.ActualizacionUsuarioNombreVacio;
import com.example.api.rest.Excepciones.FormatoContraseñaInvalida;
import com.example.api.rest.Excepciones.FormatoCorreoInvalido;
import com.example.api.rest.Excepciones.PaginaNoEncontrada;
import com.example.api.rest.Excepciones.TokenDeCreacionInvalido;
import com.example.api.rest.Excepciones.UsuarioBloqueado;
import com.example.api.rest.Excepciones.UsuarioContraseñaIncorrecta;
import com.example.api.rest.Excepciones.UsuarioCredencialesIncorrectas;
import com.example.api.rest.Excepciones.UsuarioYaExistente;

@ControllerAdvice
public class UsuarioControllerAdvice {
    @ExceptionHandler(UsuarioCredencialesIncorrectas.class)
    public ResponseEntity<String> credencialesInconrrectas(UsuarioCredencialesIncorrectas objE){
        return new ResponseEntity<String>(objE.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsuarioContraseñaIncorrecta.class)
    public ResponseEntity<String> contraseñaIncorrecta(UsuarioContraseñaIncorrecta objE){
        return new ResponseEntity<String>(objE.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsuarioYaExistente.class)
    public ResponseEntity<String> usuarioYaExistente(UsuarioYaExistente usuario){
        return new ResponseEntity<String>(usuario.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(TokenDeCreacionInvalido.class)
    public ResponseEntity<String> codigoDeValidacionInvalido(TokenDeCreacionInvalido mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsuarioBloqueado.class)
    public ResponseEntity<String> usuarioBloqueado(UsuarioBloqueado mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ActualizacionUsuarioNombreVacio.class)
    public ResponseEntity<String> nombreVacio(ActualizacionUsuarioNombreVacio mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ActualizacionUsuarioFormatoTelefono.class)
    public ResponseEntity<String> formatoTelefono(ActualizacionUsuarioFormatoTelefono mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(PaginaNoEncontrada.class)
    public ResponseEntity<String> paginaNoEncontrada(PaginaNoEncontrada mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(FormatoCorreoInvalido.class)
    public ResponseEntity<String> formatoCorreoInvalido(FormatoCorreoInvalido mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(FormatoContraseñaInvalida.class)
    public ResponseEntity<String> formatoContraseñaInvalido(FormatoContraseñaInvalida mensaje){
        return new ResponseEntity<String>(mensaje.getMessage(), HttpStatus.UNAUTHORIZED);
    }
}