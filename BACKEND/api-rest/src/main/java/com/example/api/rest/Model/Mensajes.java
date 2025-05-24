package com.example.api.rest.Model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Mensajes {
    private String nombreUsuario;
    private String contenido;
    private Date fecha;
    private Date hora;
}
