package com.example.api.rest.Controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @PostMapping("/ARCHIVAR-NOTIFICACION/{id}")
    public ResponseEntity<String> archivarNotificacion(@PathVariable ObjectId id){
        return new ResponseEntity<String>(notificacionesServicio.archivarNotificacion(id),HttpStatus.OK);
    }

    @PostMapping("/LISTAR-NOTIFICACIONES-ARCHIVADAS/{archivado}/{nombreUsuarioReceptor}")
    public ResponseEntity<List<NotificacionesModel>> listarNotificacionesArchivadas(@PathVariable Boolean archivado, @PathVariable String nombreUsuarioReceptor){
        return new ResponseEntity<List<NotificacionesModel>>(notificacionesServicio.listarNotificacionesArchivadas(archivado, nombreUsuarioReceptor),HttpStatus.OK);
    }

    @DeleteMapping("/ELIMINAR-NOTIFICACION/{id}")
    public ResponseEntity<String> eliminarNotificacion(@PathVariable ObjectId id){
        return new ResponseEntity<String>(notificacionesServicio.eliminarNotificacion(id), HttpStatus.OK);
    }
}
