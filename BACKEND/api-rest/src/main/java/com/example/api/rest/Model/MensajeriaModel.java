package com.example.api.rest.Model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.api.rest.Repository.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("Mensajeria")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MensajeriaModel {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String nombreUsuarioDestinatario;
    private String nombreUsuarioRemitente;
    private String contenido;
    private Date fecha;
    private Date hora;
}
