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

import com.example.api.rest.Model.ChatsModel;
import com.example.api.rest.Model.Mensajes;

import org.bson.types.ObjectId;
import com.example.api.rest.Service.IChatsService;

@RestController
@RequestMapping("/UAO/INGSOFT/PROYECTO")
public class ChatsController {
    @Autowired IChatsService chatsServicio;

    @PostMapping("/CREAR-MENSAJE")
    public ResponseEntity<String> crearMensaje(@RequestBody ChatsModel mensaje){
        chatsServicio.mensajes(mensaje);
        return new ResponseEntity<String>("Mensaje enviado", HttpStatus.OK);
    }

    @PostMapping("/LISTAR-CHATS/{nombreUsuarioDestinatario}")
    public ResponseEntity<List<ChatsModel>> listarChats(@PathVariable String nombreUsuarioDestinatario){
        return new ResponseEntity<List<ChatsModel>>(chatsServicio.listarChats(nombreUsuarioDestinatario), HttpStatus.OK);
    }

    @PostMapping("/LISTAR-MENSAJES/{idUsuarioPropietario}/{nombreUsuarioRemitente}")
    public ResponseEntity<List<Mensajes>> listarMensajes(@PathVariable ObjectId idUsuarioPropietario,@PathVariable String nombreUsuarioRemitente){
        return new ResponseEntity<List<Mensajes>>(chatsServicio.listarMensajes(idUsuarioPropietario,nombreUsuarioRemitente), HttpStatus.OK);
    }

    @PostMapping("/BUSCAR-CHAT/{idUsuarioPropietario}")
    public ResponseEntity<ChatsModel> crearChat(@PathVariable ObjectId idUsuarioPropietario, @RequestBody ChatsModel chat){
        return new ResponseEntity<ChatsModel>(chatsServicio.crearChat(idUsuarioPropietario, chat), HttpStatus.OK);
    }
}
