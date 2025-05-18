package com.example.api.rest.Model;

import java.util.Date;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Mensajes {
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId idUsuarioDestinatario;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId idUsuarioRemitente;
    private String contenido;
    private Date fecha;
    private Date hora;
}
