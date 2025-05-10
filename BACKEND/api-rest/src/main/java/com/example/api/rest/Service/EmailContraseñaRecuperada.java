package com.example.api.rest.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.api.rest.Model.UsuarioModel;

import lombok.AllArgsConstructor;
import lombok.Data;

@Service
@Data
@AllArgsConstructor
public class EmailContraseñaRecuperada {
    private final JavaMailSender sender;
    public void sendMail(UsuarioModel usuario){
        SimpleMailMessage mensaje = new SimpleMailMessage();
        String subject = "CONTRASEÑA RECUPERADA";
        String text = usuario.getUserName() + " tu contraseña ha sido cambiada con exito";
        mensaje.setFrom("admigestionarrendamiento@gmail.com");
        mensaje.setTo(usuario.getEmail());
        mensaje.setSubject(subject);
        mensaje.setText(text);
        sender.send(mensaje);
    }
}