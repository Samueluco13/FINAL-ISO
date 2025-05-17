package com.example.api.rest.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.rest.Model.NotificacionesModel;
import com.example.api.rest.Service.INotificacionesService;

@RestController
@RequestMapping("/UAO/INGSOFT/PROYECTO")
public class NotificacionesController {

    @Autowired INotificacionesService notificacionesServicio;

    @PostMapping("/LISTAR-NOTIFICACIONES/{nombreUsuarioReceptor}")
    public ResponseEntity<List<NotificacionesModel>> listarNotificaciones(@PathVariable String nombreUsuarioReceptor){
        return new ResponseEntity<List<NotificacionesModel>>(notificacionesServicio.listarNotificaciones(nombreUsuarioReceptor), HttpStatus.OK);
    }
}
