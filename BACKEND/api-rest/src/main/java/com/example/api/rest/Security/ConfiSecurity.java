package com.example.api.rest.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class ConfiSecurity {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/UAO/INGSOFT/PROYECTO/REGISTRO", "/UAO/INGSOFT/PROYECTO/{id}", "/UAO/INGSOFT/PROYECTO/ACTUALIZAR/{id}", "/UAO/INGSOFT/PROYECTO/LOGIN", "/UAO/INGSOFT/PROYECTO/COMENTAR","/UAO/INGSOFT/PROYECTO/PROPIEDAD/CREACION", "/UAO/INGSOFT/PROYECTO/PROPIEDAD/{nombre}", "/UAO/INGSOFT/PROYECTO/ELIMINAR/PROPIEDAD/{nombre}", "/UAO/INGSOFT/PROYECTO/REPORTAR/PROPIEDAD/{nombre}", "/UAO/INGSOFT/PROYECTO/ENVIO-EMAIL", "/UAO/INGSOFT/PROYECTO/LISTAR-MENSAJES/{idUsuarioPropietario}/{nombreUsuarioRemitente}","/UAO/INGSOFT/PROYECTO/LISTAR-CHATS/{nombreUsuarioDestinatario}").permitAll()
                .anyRequest().permitAll()
            );
        return http.build();
    }
}
