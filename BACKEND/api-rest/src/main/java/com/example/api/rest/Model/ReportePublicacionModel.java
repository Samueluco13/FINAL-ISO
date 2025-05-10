package com.example.api.rest.Model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document("reportePublicacion")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportePublicacionModel {
    @Id
    @JsonSerialize(using = ToStringSerializer.class) 
    private ObjectId id;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId idUsuario;
    private String nombreUsuarioReporte;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId idPublicacion;
    private String motivo;
    private String comentarios;
    private Date fecha;
    private Date hora;
    private String desicion;
    private Boolean valido;
}