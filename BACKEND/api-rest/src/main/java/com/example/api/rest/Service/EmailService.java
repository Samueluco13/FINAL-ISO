package com.example.api.rest.Service;

import java.security.SecureRandom;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.FormatoContraseñaInvalida;
import com.example.api.rest.Excepciones.FormatoCorreoInvalido;
import com.example.api.rest.Excepciones.UsuarioYaExistente;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Repository.IUsuarioRepository;

import lombok.Data;

@Service
@Data
public class EmailService {
    private final JavaMailSender mailSender;
    private ConcurrentHashMap<String, String> codigosVerificacion = new ConcurrentHashMap<>();

    @Autowired IUsuarioRepository usuarioRepositorio;
    
    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public UsuarioModel buscarUsuarioPorCorreo(String email) {
        Optional<UsuarioModel> usuario = usuarioRepositorio.findByEmail(email);
        return usuario.orElse(null);
    }

    public UsuarioModel buscarUsuarioPorUserName(String userName){
        Optional<UsuarioModel> usuarioBusqueda = usuarioRepositorio.findByUserName(userName);
        return usuarioBusqueda.orElse(null);
    }
    public void sendEmail(UsuarioModel usuario){
        UsuarioModel emailBusqueda = buscarUsuarioPorCorreo(usuario.getEmail());
        UsuarioModel userNameBusqueda = buscarUsuarioPorUserName(usuario.getUserName());
        if(emailBusqueda != null ){
            throw new UsuarioYaExistente("El usuario con el correo: " + emailBusqueda.getEmail() + " ya existe");
        }
        if(userNameBusqueda != null){
            throw new UsuarioYaExistente("EL usuario con el nombre de usuario: " + usuario.getUserName() + " ya existe");
        }
        
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        if (!usuario.getEmail().matches(emailRegex)) {
            throw new FormatoCorreoInvalido("El formato del correo electrónico es inválido: " + usuario.getEmail());
        }

        // Validar seguridad de la contraseña
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (!usuario.getPassword().matches(passwordRegex)) {
            throw new FormatoContraseñaInvalida("La contraseña no cumple con los requisitos de seguridad: mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
        }
        
        final SecureRandom ramdom = new SecureRandom();
        int verificador = 1000 + ramdom.nextInt(9000);
        String codigo = String.valueOf(verificador);
        codigosVerificacion.put(usuario.getEmail(), codigo);
        String subject = "COMFIRMACION CREACION DE CUENTA";
        String text = "Hola!! " + usuario.getUserName() + " tu cuenta ha sido verificada con exito" + "\n" + "Escribe este token para validar tu inicio de sesion: " + codigo;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("admigestionarrendamiento@gmail.com");
        message.setTo(usuario.getEmail());
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public Boolean validarTokenDeCreacion(UsuarioModel usuario){
        String codigoGuardado = codigosVerificacion.get(usuario.getEmail());
        if(codigoGuardado != null && codigoGuardado.equals(usuario.getToken())){
            codigosVerificacion.remove(usuario.getEmail()); // eliminar para que no reusen
            return true;
        }
        return false;
    }
}