package com.example.api.rest.Model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.api.rest.Model.ENUM.enumsDisponibilidad;
import com.example.api.rest.Model.ENUM.enumsEstadoPropiedad;
import com.example.api.rest.Model.ENUM.enumsTipoPropiedad;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("Propiedades")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropiedadesModel {
    @Id 
    @JsonSerialize(using = ToStringSerializer.class) 
    private ObjectId id;
    private String nombre;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId idUsuarioPropietario;
    private enumsTipoPropiedad tipo;
    private String condiciones;
    private String descripcion;
    private Long costo;
    private enumsDisponibilidad disponibilidad;
    private enumsEstadoPropiedad estado;
    private Direcciones direccion;
    private List<String> imagenes = new ArrayList<>();
    private Integer promedioCalificacion;
    private Date fechaPublicacion;
    private List<Comentarios> comentarios = new ArrayList<>();
    private List<Mensajes> mensajeria = new ArrayList<>();
    private Boolean visible;
}   