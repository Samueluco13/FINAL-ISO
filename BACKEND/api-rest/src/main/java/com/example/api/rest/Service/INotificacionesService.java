package com.example.api.rest.Service;

import java.util.List;

import com.example.api.rest.Model.NotificacionesModel;

public interface INotificacionesService {
    public List<NotificacionesModel> listarNotificaciones(String nombreUsuarioReceptor);
}
