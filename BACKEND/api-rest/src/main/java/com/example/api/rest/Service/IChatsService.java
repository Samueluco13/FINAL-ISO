package com.example.api.rest.Service;

import java.util.List;

import com.example.api.rest.Model.ChatsModel;
import com.example.api.rest.Model.Mensajes;
import com.example.api.rest.Model.UsuarioModel;
import org.bson.types.ObjectId;

public interface IChatsService {
    public List<Mensajes> listarMensajes(ObjectId idUsuarioPropietario, String nombreUsuarioRemitente, String nombreParticipante1);
    public void mensajes(ObjectId idUsuarioDestinatario, ChatsModel mensaje);
    public List<ChatsModel> listarChats(String nombreUsuarioDestinatario);
    public UsuarioModel buscarUsuario(ObjectId idUsuarioPropietario);
    public ChatsModel buscarChat(List<String> participantes);
    public ChatsModel crearChat(ObjectId idUsuarioPropietario, ChatsModel chat);
    public UsuarioModel buscarUsuarioPorNombre(String nombre);
    public void visto(ObjectId idUsuarioPropietario, String nombreUsuarioRemitente, String nombreParticipante1);
}
