package com.example.api.rest.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.UsuarioSinMensajes;
import com.example.api.rest.Model.MensajeriaModel;
import com.example.api.rest.Repository.IMensajeriaRepository;

@Service
public class MensajeriaServiceImp implements IMensajeriaService{
    @Autowired IMensajeriaRepository mensajeriaRepositorio;
    @Override
    public void mensajes(MensajeriaModel mensaje) {
        mensajeriaRepositorio.save(mensaje);
    }

    @Override
    public List<MensajeriaModel> listarMensajes(String nombreUsuarioDestinatario, String nombreUsuarioRemitente) {
        List<MensajeriaModel> listaDeMensajes = mensajeriaRepositorio.findByNombreUsuarioDestinatarioAndNombreUsuarioRemitenteOrderByFechaAscHoraAsc(nombreUsuarioDestinatario, nombreUsuarioRemitente);
        if(listaDeMensajes.size() < 0){
            throw new UsuarioSinMensajes("No tienes chats actuales");
        }
        return listaDeMensajes;
    }    
}
