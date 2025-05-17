package com.example.api.rest.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Model.NotificacionesModel;
import com.example.api.rest.Repository.INotificacionesRepositorty;

@Service
public class NotificacionesService implements INotificacionesService{

    @Autowired INotificacionesRepositorty notificacionesRepositorio;

    @Override
    public List<NotificacionesModel> listarNotificaciones(String nombreUsuarioReceptor) {
        List<NotificacionesModel> listaDeNotificaciones = notificacionesRepositorio.findByNombreUsuarioReceptor(nombreUsuarioReceptor);
        return listaDeNotificaciones;
    }
    
}
