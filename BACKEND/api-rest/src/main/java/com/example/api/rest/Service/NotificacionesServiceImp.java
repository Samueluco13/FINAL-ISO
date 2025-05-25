package com.example.api.rest.Service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Model.NotificacionesModel;
import com.example.api.rest.Repository.INotificacionesRepositorty;

@Service
public class NotificacionesServiceImp implements INotificacionesService{

    @Autowired INotificacionesRepositorty notificacionesRepositorio;
    
    @Override
    public NotificacionesModel buscarNotificacion(ObjectId id) {
        return notificacionesRepositorio.findById(id).orElse(null);
    }

    @Override
    public List<NotificacionesModel> listarNotificaciones(String nombreUsuarioReceptor) {
        List<NotificacionesModel> listaDeNotificaciones = notificacionesRepositorio.findByArchivadoAndNombreUsuarioReceptor(false,nombreUsuarioReceptor);
        return listaDeNotificaciones;
    }

    @Override
    public String archivarNotificacion(ObjectId idNotificacion) {
        NotificacionesModel notificacionEncontrada = buscarNotificacion(idNotificacion);
        notificacionEncontrada.setArchivado(true);
        notificacionesRepositorio.save(notificacionEncontrada);
        return "Notificacion archivada con exito";
    }

    @Override
    public List<NotificacionesModel> listarNotificacionesArchivadas(Boolean archivado, String nombreUsuarioReceptor) {
        List<NotificacionesModel> notificaciones = notificacionesRepositorio.findByArchivadoAndNombreUsuarioReceptor(archivado, nombreUsuarioReceptor);
        return notificaciones;
    }

    @Override
    public String eliminarNotificacion(ObjectId id) {
        NotificacionesModel notificacionEncontrada = buscarNotificacion(id);
        notificacionesRepositorio.delete(notificacionEncontrada);
        return "Notificacion eliminada";
    }
    
}
