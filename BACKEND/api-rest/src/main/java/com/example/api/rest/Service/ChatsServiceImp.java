package com.example.api.rest.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.UsuarioSinMensajes;
import com.example.api.rest.Model.ChatsModel;
import com.example.api.rest.Model.Mensajes;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Repository.IChatsRepository;
import com.example.api.rest.Repository.IUsuarioRepository;
import org.bson.types.ObjectId;

@Service
public class ChatsServiceImp implements IChatsService{
    @Autowired IChatsRepository chatsRepositorio;
    @Autowired IUsuarioRepository usuarioRepositorio;

    @Override
    public UsuarioModel buscarUsuario(ObjectId idUsuarioPropietario) {
        return usuarioRepositorio.findById(idUsuarioPropietario).orElse(null);
    } 

    @Override
    public ChatsModel buscarChat(String nombreUsuarioDestinatario, String nombreUsuarioRemitente) {
        Optional<ChatsModel> chatEncontrado = chatsRepositorio.findByNombreUsuarioDestinatarioAndNombreUsuarioRemitente(nombreUsuarioDestinatario, nombreUsuarioRemitente);
        return chatEncontrado.orElse(null);
    }

    @Override
    public void mensajes(ObjectId idUsuarioDestinatario, ChatsModel mensaje) {
        UsuarioModel usuarioEncontrado = buscarUsuario(idUsuarioDestinatario);
        ChatsModel chatEncontrado = buscarChat(usuarioEncontrado.getNombre(), mensaje.getNombreUsuarioDestinatario());
        if(mensaje.getMensajes().size() == 0){
            throw new UsuarioSinMensajes("No tienes chats activos");
        }
        for(int i = 0; i < mensaje.getMensajes().size(); i++){
            chatEncontrado.getMensajes().add(mensaje.getMensajes().get(i));
        }
        chatsRepositorio.save(chatEncontrado);
    }

    @Override
    public List<Mensajes> listarMensajes(ObjectId idUsuarioPropietario, String nombreUsuarioRemitente) {
        UsuarioModel usuarioEncontrado = buscarUsuario(idUsuarioPropietario);
        ChatsModel chatEncontrado = buscarChat(usuarioEncontrado.getNombre(), nombreUsuarioRemitente);
        if(chatEncontrado.getMensajes().size() == 0){
            throw new UsuarioSinMensajes("no tienes mensajes actuales");
        }
        List<Mensajes> mensajes = new ArrayList<>();
        for(int i = 0; i < chatEncontrado.getMensajes().size(); i++){
            mensajes.add(chatEncontrado.getMensajes().get(i));
        }
        return mensajes;
    } 

    @Override
    public List<ChatsModel> listarChats(String nombreUsuarioDestinatario) {
        List<ChatsModel> chats = chatsRepositorio.findByNombreUsuarioDestinatario(nombreUsuarioDestinatario);
        if(chats.size() < 0){
            throw new UsuarioSinMensajes("No tienes chats");
        }
        return chats;
    }

    @Override
    public ChatsModel crearChat(ObjectId idUsuarioPropietario, ChatsModel chat) {
        UsuarioModel usuarioEncontrado = buscarUsuario(idUsuarioPropietario);
        System.out.println(usuarioEncontrado.getNombre());
        chat.setNombreUsuarioDestinatario(usuarioEncontrado.getNombre());
        System.out.println(chat.getNombreUsuarioDestinatario());
        chatsRepositorio.save(chat);

        ChatsModel chatEncontrado = buscarChat(chat.getNombreUsuarioDestinatario(), chat.getNombreUsuarioRemitente());
        if(chatEncontrado != null){
            return chatEncontrado;
        }
        return chat;
    }


}
