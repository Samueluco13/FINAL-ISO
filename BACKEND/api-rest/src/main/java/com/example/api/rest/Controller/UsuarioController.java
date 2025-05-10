package com.example.api.rest.Controller;

import org.bson.types.ObjectId;
//import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.rest.Excepciones.TokenDeCreacionInvalido;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Service.EmailService;
import com.example.api.rest.Service.EmailServiceRecuperarContraseña;
import com.example.api.rest.Service.IUsuarioService;

@RestController
@RequestMapping("/UAO/INGSOFT/PROYECTO") 
public class UsuarioController {
    @Autowired IUsuarioService usuarioServicio;
    @Autowired EmailService emailService;
    @Autowired EmailServiceRecuperarContraseña emialServiceRecuperacionContraseña;


    @PostMapping("/ENVIO-EMAIL")
    public ResponseEntity<String> enviarCorreoCreacionUsuario(@RequestBody UsuarioModel usuario){
        emailService.sendEmail(usuario);
        return new ResponseEntity<String>("Correo de validacion enviado", HttpStatus.OK);
    }
    
    @PostMapping("/REGISTRO")
    public ResponseEntity<String> crearUsuario(@RequestBody UsuarioModel usuario){
        if(emailService.validarTokenDeCreacion(usuario) == false){
            throw new TokenDeCreacionInvalido("Codigo de verificacion invalido");
        }
        return new ResponseEntity<String>(usuarioServicio.crearUsuario(usuario), HttpStatus.OK);
    }
    
    @PostMapping("/REGISTRO-GOOGLE")
    public ResponseEntity<String> registroConGoogle(@RequestBody UsuarioModel usuario){
        return new ResponseEntity<String>(usuarioServicio.creacionUsuarioGoogle(usuario), HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable ObjectId id){
        return new ResponseEntity<String>(usuarioServicio.eliminarUsuario(id), HttpStatus.OK);
    }
    
    @PutMapping("/ACTUALIZAR/{id}")
    public ResponseEntity<UsuarioModel> actualizarUsuario(@PathVariable ObjectId id, @RequestBody UsuarioModel usuario){
        return new ResponseEntity<UsuarioModel>(usuarioServicio.actualizarUsuario(id,usuario), HttpStatus.OK);
    }

    @PostMapping("/LOGIN")
    public ResponseEntity<UsuarioModel> validarInicioSesion(@RequestBody UsuarioModel usuario){
        return new ResponseEntity<UsuarioModel>(usuarioServicio.validarInicioSesion(usuario.getUserName(), usuario.getPassword()), HttpStatus.OK);
    }

    @PutMapping("/COMENTAR")
    public ResponseEntity<String> comentarPublicacion(@RequestBody PropiedadesModel propiedadComentar){
        return new ResponseEntity<String>(usuarioServicio.comentarPublicacion(propiedadComentar), HttpStatus.OK);
    }

    @PostMapping("/recuperate-password-email")
    public ResponseEntity<String> envioEmialRecuperacionContraseña(@RequestBody UsuarioModel usuario){
        return new ResponseEntity<String>(emialServiceRecuperacionContraseña.sendEmail(usuario), HttpStatus.OK);
    }

    @PutMapping("/recuperate-password")
    public ResponseEntity<String> recuperarContraseña(@RequestBody UsuarioModel usuario){
        return new ResponseEntity<String>(usuarioServicio.recuperarContraseña(usuario), HttpStatus.OK);
    }
}    
