package com.example.api.rest.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.UsuarioSinMensajes;
import com.example.api.rest.Model.ChatsModel;
import com.example.api.rest.Model.Mensajes;
import com.example.api.rest.Model.NotificacionesModel;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Model.ENUM.enumsNotificaciones;
import com.example.api.rest.Model.ENUM.enumsUsuario;
import com.example.api.rest.Repository.IChatsRepository;
import com.example.api.rest.Repository.INotificacionesRepositorty;
import com.example.api.rest.Repository.IUsuarioRepository;
import org.bson.types.ObjectId;

@Service
public class ChatsServiceImp implements IChatsService{
    @Autowired IChatsRepository chatsRepositorio;
    @Autowired IUsuarioRepository usuarioRepositorio;
    @Autowired INotificacionesRepositorty notificacionesRepositorio;

    @Override
    public UsuarioModel buscarUsuario(ObjectId idUsuarioPropietario) {
        return usuarioRepositorio.findById(idUsuarioPropietario).orElse(null);
    } 

    @Override
    public UsuarioModel buscarUsuarioPorNombre(String nombre) {
        Optional<UsuarioModel> usuarioEncontrado = usuarioRepositorio.findByUserName(nombre);
        return usuarioEncontrado.orElse(null);
    }

    @Override
    public ChatsModel buscarChatPorId(ObjectId id) {
        return chatsRepositorio.findById(id).orElse(null);
    }

    @Override
    public ChatsModel buscarChat(List<String> participantes) {
        Optional<ChatsModel> chatEncontrado = chatsRepositorio.findChatByExactTwoParticipants(participantes);
        return chatEncontrado.orElse(null);
    }

    @Override
    public void mensajes(ObjectId idUsuarioDestinatario, ChatsModel mensaje) {
        UsuarioModel usuarioEncontrado = buscarUsuario(idUsuarioDestinatario);
        UsuarioModel usuarioEncontrado2 = buscarUsuarioPorNombre(mensaje.getParticipantes().get(0));
        mensaje.getParticipantes().add(usuarioEncontrado.getUserName());
        ChatsModel chatEncontrado = buscarChat(mensaje.getParticipantes());
        Date fechaActual = new Date();
        if(usuarioEncontrado2.getTipo() == enumsUsuario.interesado){
            NotificacionesModel notificacionParaReceptor = new NotificacionesModel(enumsNotificaciones.mensaje, fechaActual, usuarioEncontrado2.getUserName(), "El usuario " + usuarioEncontrado2.getUserName() + ", te ha enviado un mensaje", usuarioEncontrado.getUserName(), false);
            NotificacionesModel notificacionParaEnvia= new NotificacionesModel(enumsNotificaciones.mensaje, fechaActual, "Haz enviado un mensaje a: " + usuarioEncontrado.getUserName(), usuarioEncontrado2.getUserName(), false);
            notificacionesRepositorio.save(notificacionParaReceptor);
            notificacionesRepositorio.save(notificacionParaEnvia);
        }else{
            NotificacionesModel notificacionParaReceptor = new NotificacionesModel(enumsNotificaciones.mensaje, fechaActual, usuarioEncontrado.getUserName(), "El usuario " + usuarioEncontrado.getUserName() + ", te ha enviado un mensaje", usuarioEncontrado2.getUserName(), false);
            NotificacionesModel notificacionParaEnvia= new NotificacionesModel(enumsNotificaciones.mensaje, fechaActual, "Haz enviado un mensaje a: " + usuarioEncontrado2.getUserName(), usuarioEncontrado.getUserName(), false);
            notificacionesRepositorio.save(notificacionParaReceptor);
            notificacionesRepositorio.save(notificacionParaEnvia);
        }
        for(int i = 0; i < mensaje.getMensajes().size(); i++){
            chatEncontrado.getMensajes().add(mensaje.getMensajes().get(i));
        }
        chatsRepositorio.save(chatEncontrado);
    }

    @Override
    public List<Mensajes> listarMensajes(ObjectId idUsuarioPropietario, String nombreUsuarioRemitente, String nombreParticipante1) {
        UsuarioModel usuarioEncontrado = buscarUsuario(idUsuarioPropietario);
        UsuarioModel usuarioEncontrado2 = buscarUsuarioPorNombre(nombreParticipante1);
        List<String> participantes = new ArrayList<>();
        if(usuarioEncontrado2 == null){
            participantes.add(nombreUsuarioRemitente);
            participantes.add(usuarioEncontrado.getUserName());
            ChatsModel chatEncontrado = buscarChat(participantes);
            if(chatEncontrado.getMensajes().size() == 0){
                throw new UsuarioSinMensajes("no tienes mensajes actuales");
            }
            List<Mensajes> mensajes = new ArrayList<>();
            for(int i = 0; i < chatEncontrado.getMensajes().size(); i++){
                mensajes.add(chatEncontrado.getMensajes().get(i));
            }
            return mensajes;
        }
        participantes.add(nombreParticipante1);
        participantes.add(nombreUsuarioRemitente);
        ChatsModel chatEncontrado2 = buscarChat(participantes);
        if(chatEncontrado2.getMensajes().size() == 0){
            throw new UsuarioSinMensajes("no tienes mensajes actuales");
        }
        List<Mensajes> mensajes2 = new ArrayList<>();
        for(int i = 0; i < chatEncontrado2.getMensajes().size(); i++){
            mensajes2.add(chatEncontrado2.getMensajes().get(i));
        }
        return mensajes2;

        
    } 

    @Override
    public List<ChatsModel> listarChats(String nombreUsuarioDestinatario) {
        List<ChatsModel> chats = chatsRepositorio.findByParticipantesContaining(nombreUsuarioDestinatario);
        if(chats.size() < 0){
            throw new UsuarioSinMensajes("No tienes chats");
        } 
        return chats;
    }

    @Override
    public ChatsModel crearChat(ObjectId idUsuarioPropietario, ChatsModel chat) {
        UsuarioModel usuarioEncontrado = buscarUsuario(idUsuarioPropietario);
        chat.getParticipantes().add(usuarioEncontrado.getUserName());
        ChatsModel chatEncontrado = buscarChat(chat.getParticipantes());
        if(chatEncontrado == null){
            chatsRepositorio.save(chat);
            return chat;
        }
        return chatEncontrado;
    }

    @Override
    public void visto(ObjectId idUsuarioPropietario, String nombreUsuarioRemitente, String nombreParticipante1) {
        UsuarioModel usuarioPorId = buscarUsuario(idUsuarioPropietario);
        UsuarioModel usuarioPorNombre = buscarUsuarioPorNombre(nombreParticipante1);
        List<String> participantes = new ArrayList<>();
        if(usuarioPorNombre == null){
            participantes.add(usuarioPorId.getUserName());
            participantes.add(nombreUsuarioRemitente);
            ChatsModel chatEncontrado = buscarChat(participantes);
            for(int i = 0; i < chatEncontrado.getMensajes().size(); i++){
                chatEncontrado.getMensajes().get(i).setVisto(true);
            }  
            chatsRepositorio.save(chatEncontrado);
        }
        participantes.add(nombreUsuarioRemitente);
        participantes.add(nombreParticipante1);
        ChatsModel chatEncontrado2 = buscarChat(participantes);
        for(int i = 0; i < chatEncontrado2.getMensajes().size(); i++){
            chatEncontrado2.getMensajes().get(i).setVisto(true);
        }  
        chatsRepositorio.save(chatEncontrado2);
    }

    @Override
    public String eliminarChat(ObjectId idChat) {
        ChatsModel chatEncontrado = buscarChatPorId(idChat);
        chatsRepositorio.delete(chatEncontrado);
        return "Chat eliminado con exito";
    }

}