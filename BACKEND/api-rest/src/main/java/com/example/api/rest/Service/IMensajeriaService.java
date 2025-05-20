package com.example.api.rest.Service;

import java.util.List;

import com.example.api.rest.Model.MensajeriaModel;
import com.example.api.rest.Model.UsuarioModel;
import org.bson.types.ObjectId;

public interface IMensajeriaService {
    public List<MensajeriaModel> listarMensajes(ObjectId idUsuarioPropietario, String nombreUsuarioRemitente);
    public void mensajes(MensajeriaModel mensaje);
    public List<MensajeriaModel> listarChats(String nombreUsuarioDestinatario);
    public UsuarioModel buscarUsuario(ObjectId idUsuarioPropietario);
}
