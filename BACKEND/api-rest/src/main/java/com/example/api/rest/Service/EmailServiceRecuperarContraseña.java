package com.example.api.rest.Service;

import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.UsuarioRecuperacionContraseña;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Repository.IUsuarioRepository;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
@Service
public class EmailServiceRecuperarContraseña{
    private final JavaMailSender mailSender;
    @Autowired IUsuarioRepository usuarioRepositorio;

    public UsuarioModel buscarUsuarioUserName(String UserName){
        Optional<UsuarioModel> usuario = usuarioRepositorio.findByUserName(UserName);
        return usuario.orElse(null);
    }

    public String sendEmail(UsuarioModel usuario){
        UsuarioModel usuarioEncontrado = buscarUsuarioUserName(usuario.getUserName());
        if(usuarioEncontrado == null){
            throw new UsuarioRecuperacionContraseña("No se encontro correo asociado a ese nombre de usuario");
        }
        String subject = "RECUPERACION DE CONTRASEÑA";
        String text = "Para recuperar tu contraseña dirigete a este link: http://localhost:5173/recuperate-password/" + usuarioEncontrado.getToken() + "?user=" + URLEncoder.encode(usuarioEncontrado.getUserName(), StandardCharsets.UTF_8);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("admigestionarrendamiento@gmail.com");
        message.setTo(usuarioEncontrado.getEmail());
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
        return "Correo de recuperacion enviado a Email asociado a el usuario: " + usuarioEncontrado.getEmail();
    }
}
