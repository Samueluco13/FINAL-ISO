package com.example.api.rest.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.api.rest.Repository.ObjectId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document("Chats")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatsModel {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String nombreUsuarioDestinatario;
    private String nombreUsuarioRemitente;
    private List<Mensajes> mensajes;
}
