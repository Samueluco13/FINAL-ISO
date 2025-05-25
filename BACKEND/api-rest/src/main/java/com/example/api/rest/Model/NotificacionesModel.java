package com.example.api.rest.Model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.api.rest.Model.ENUM.enumsNotificaciones;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("Notificaciones")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificacionesModel {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private enumsNotificaciones tipo;
    private Date fecha;
    private String nombreUsuarioCreador;
    private String contenido;
    private String nombreUsuarioReceptor;
    private Boolean archivado;

    public NotificacionesModel(enumsNotificaciones tipo, Date fecha, String nombreUsuarioCreador, String contenido, String nombreUsuarioReceptor, Boolean archivado){
        this.tipo = tipo;
        this.fecha = fecha;
        this.nombreUsuarioCreador = nombreUsuarioCreador;
        this.contenido = contenido;
        this.nombreUsuarioReceptor = nombreUsuarioReceptor;
        this.archivado = archivado;
    }

    public NotificacionesModel(enumsNotificaciones tipo, Date fecha, String contenido, String nombreUsuarioReceptor, Boolean archivado){
        this.tipo = tipo;
        this.fecha = fecha;
        this.contenido = contenido;
        this.nombreUsuarioReceptor = nombreUsuarioReceptor;
        this.archivado = archivado;
    }
}
