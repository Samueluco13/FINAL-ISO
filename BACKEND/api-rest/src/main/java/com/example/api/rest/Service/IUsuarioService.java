package com.example.api.rest.Service;

import org.bson.types.ObjectId;

import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.UsuarioModel;

public interface IUsuarioService {
    public String crearUsuario(UsuarioModel usuario);
    public String creacionUsuarioGoogle(UsuarioModel usuario);
    public String eliminarUsuario(ObjectId id);
    public UsuarioModel validarInicioSesion(String nombre, String password);
    public UsuarioModel actualizarUsuario(ObjectId id, UsuarioModel usuario);
    //Para garantizar funcionalidad de otros metodos
    public UsuarioModel buscarUsuario(ObjectId id);
    public UsuarioModel buscarUsuarioPorUserName(String UserName);
    public UsuarioModel buscarUsuarioPorCorreo(String email);
    public String comentarPublicacion(PropiedadesModel comentario);
    public String recuperarContraseña(UsuarioModel usuario);
}
    

