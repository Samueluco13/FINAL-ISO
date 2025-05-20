package com.example.api.rest.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.UsuarioSinMensajes;
import com.example.api.rest.Model.MensajeriaModel;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Repository.IMensajeriaRepository;
import com.example.api.rest.Repository.IUsuarioRepository;
import org.bson.types.ObjectId;

@Service
public class MensajeriaServiceImp implements IMensajeriaService{
    @Autowired IMensajeriaRepository mensajeriaRepositorio;
    @Autowired IUsuarioRepository usuarioRepositorio;
    @Override
    public void mensajes(MensajeriaModel mensaje) {
        mensajeriaRepositorio.save(mensaje);
    }

    @Override
    public UsuarioModel buscarUsuario(ObjectId idUsuarioPropietario) {
        return usuarioRepositorio.findById(idUsuarioPropietario).orElseThrow(null);
    } 

    @Override
    public List<MensajeriaModel> listarMensajes(ObjectId idUsuarioPropietario, String nombreUsuarioRemitente) {
        UsuarioModel usuarioEncontrado = buscarUsuario(idUsuarioPropietario);
        List<MensajeriaModel> listaDeMensajes = mensajeriaRepositorio.findByNombreUsuarioDestinatarioAndNombreUsuarioRemitenteOrderByFechaAscHoraAsc(usuarioEncontrado.getNombre(), nombreUsuarioRemitente);
        if(listaDeMensajes.size() < 0){
            throw new UsuarioSinMensajes("No tienes mensajes actuales");
        }
        return listaDeMensajes;
    } 

    @Override
    public List<MensajeriaModel> listarChats(String nombreUsuarioDestinatario) {
        List<MensajeriaModel> chats = mensajeriaRepositorio.findByNombreUsuarioDestinatario(nombreUsuarioDestinatario);
        if(chats.size() < 0){
            throw new UsuarioSinMensajes("No tienes chats");
        }
        return chats;
    }

}
