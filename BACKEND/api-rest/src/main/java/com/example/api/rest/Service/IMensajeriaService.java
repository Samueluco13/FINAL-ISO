package com.example.api.rest.Service;

import java.util.List;

import com.example.api.rest.Model.MensajeriaModel;

public interface IMensajeriaService {
    public List<MensajeriaModel> listarMensajes(String nombreUsuarioDestinatario, String nombreUsuarioRemitente);
    public void mensajes(MensajeriaModel mensaje);
}
