package com.example.api.rest.Model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.api.rest.Model.ENUM.enumsUsuario;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("Usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioModel {
    @Id 
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String nombre;
    private String email;
    private String password;
    private enumsUsuario tipo;
    private Integer promedioCalificacion;
    private String foto;
    private String telefono;
    @Indexed(unique = true)
    private String userName;
    private String token;
    private Boolean bloqueado;
    private Date fechaReactivacion;
    private Integer intentosFallidos;
}
