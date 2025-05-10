package com.example.api.rest.Model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor    
public class Comentarios{
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private ObjectId idUsuarioInteresado;
    private String contenido;
    private Date fecha;

    public Comentarios(ObjectId idUsuarioInteresado, String contenido, Date fecha){
        this.idUsuarioInteresado = idUsuarioInteresado;
        this.contenido = contenido;
        this.fecha = fecha;
    }
}