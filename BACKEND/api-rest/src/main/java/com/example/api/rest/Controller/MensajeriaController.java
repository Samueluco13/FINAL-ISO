package com.example.api.rest.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.rest.Model.MensajeriaModel;
import org.bson.types.ObjectId;
import com.example.api.rest.Service.IMensajeriaService;

@RestController
@RequestMapping("/UAO/INGSOFT/PROYECTO")
public class MensajeriaController {
    @Autowired IMensajeriaService mensajeriaServicio;

    @PostMapping("/CREAR-MENSAJE")
    public ResponseEntity<String> crearMensaje(@RequestBody MensajeriaModel mensaje){
        mensajeriaServicio.mensajes(mensaje);
        return new ResponseEntity<String>("Mensaje enviado", HttpStatus.OK);
    }

    @PostMapping("/LISTAR-MENSAJES/{idUsuarioPropietario}/{nombreUsuaroRemitente}")
    public ResponseEntity<List<MensajeriaModel>> listarComentarios(@PathVariable  ObjectId idUsuarioPropietario, @PathVariable String nombreUsuarioRemitente){
        return new ResponseEntity<List<MensajeriaModel>>(mensajeriaServicio.listarMensajes(idUsuarioPropietario, nombreUsuarioRemitente), HttpStatus.OK);
    }

    @PostMapping("/LISTAR-CHATS/{nombreUsuarioDestinatario}")
    public ResponseEntity<List<MensajeriaModel>> listarChatsPropios(@PathVariable String nombreUsuarioDestinatario){
        return new ResponseEntity<List<MensajeriaModel>>(mensajeriaServicio.listarChats(nombreUsuarioDestinatario), HttpStatus.OK);
    }
}
