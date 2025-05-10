package com.example.api.rest.Model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
public class Publicaciones{
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private Date fechaPublicacion;
    private String estado;
    private List<Comentarios> comentarios = new ArrayList<>();
}