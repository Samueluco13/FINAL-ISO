package com.example.api.rest.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/CREAR-MENSAJE/{idUsuario}")
    public ResponseEntity<String> crearMensaje(@PathVariable ObjectId idUsuario,@RequestBody ChatsModel mensaje){
        chatsServicio.mensajes(idUsuario, mensaje);
        return new ResponseEntity<String>("Mensaje enviado", HttpStatus.OK);
    }

    @PostMapping("/LISTAR-CHATS/{nombreUsuario}")
    public ResponseEntity<List<ChatsModel>> listarChats(@PathVariable String nombreUsuario){
        return new ResponseEntity<List<ChatsModel>>(chatsServicio.listarChats(nombreUsuario), HttpStatus.OK);
    }

    @PostMapping("/LISTAR-MENSAJES/{idParticipante1}/{nombreParticipante2}/{nombreParticipante1}")
    public ResponseEntity<List<Mensajes>> listarMensajes(@PathVariable ObjectId idParticipante1,@PathVariable String nombreParticipante2, @PathVariable String nombreParticipante1){
        return new ResponseEntity<List<Mensajes>>(chatsServicio.listarMensajes(idParticipante1,nombreParticipante2, nombreParticipante1), HttpStatus.OK);
    }

    @PostMapping("/BUSCAR-CHAT/{idUsuario}")
    public ResponseEntity<ChatsModel> crearChat(@PathVariable ObjectId idUsuario, @RequestBody ChatsModel chat){
        return new ResponseEntity<ChatsModel>(chatsServicio.crearChat(idUsuario,chat), HttpStatus.OK);
    }

    @PutMapping("/VISTO/{idParticipante1}/{nombreParticipante2}/{nombreParticipante1}")
    public ResponseEntity<String> hacerVisto(@PathVariable ObjectId idParticipante1,@PathVariable String nombreParticipante2, @PathVariable String nombreParticipante1){
        chatsServicio.visto(idParticipante1, nombreParticipante2, nombreParticipante1);
        return new ResponseEntity<String>("Ok", HttpStatus.OK);
    }

    @DeleteMapping("/ELIMINAR-CHAT/{idParticipante1}/{nombreParticipante2}/{nombreParticipante1}")
    public ResponseEntity<String> eliminarChat(@PathVariable ObjectId idParticipante1,@PathVariable String nombreParticipante2, @PathVariable String nombreParticipante1){
        return new ResponseEntity<String>(chatsServicio.eliminarChat(idParticipante1, nombreParticipante2, nombreParticipante1),HttpStatus.OK);
    }
}
