package com.example.api.rest.Service;

import java.util.List;

import org.bson.types.ObjectId;

import com.example.api.rest.Model.NotificacionesModel;

public interface INotificacionesService {
    public NotificacionesModel buscarNotificacion(ObjectId id);
    public List<NotificacionesModel> listarNotificaciones(String nombreUsuarioReceptor);
    public String archivarNotificacion(ObjectId idNotificacion);
    public List<NotificacionesModel> listarNotificacionesArchivadas(Boolean archivado, String nombreUsuarioReceptor);
    public String eliminarNotificacion(ObjectId id);
}
