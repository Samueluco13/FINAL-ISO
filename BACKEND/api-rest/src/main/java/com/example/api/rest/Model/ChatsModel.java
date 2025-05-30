package com.example.api.rest.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import org.bson.types.ObjectId;
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
    private List<String> participantes;
    private List<Mensajes> mensajes;
    private String avisoNombre;
}
