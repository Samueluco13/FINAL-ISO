package com.example.api.rest.Model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.api.rest.Model.ENUM.enumsEstadoAcuerdo;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document("Acuerdos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AcuerdoModel {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId idPropiedad;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId idUsuarioInteresado;
    private String userNameUsuario;
    private String nombrePropiedad;
    private Date fechaInicio;
    private Date fechaFin;
    private enumsEstadoAcuerdo estado;
    private String razonCancelacion;
    private List<EventosHistorial> eventosHistorial = new ArrayList<>();
    private List<CalificacionEspacio> calificacionEspacio = new ArrayList<>();
    private List<CalificacionArrendatario> calificacionArrendatario = new ArrayList<>();   
}
