package com.example.api.rest.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalificacionArrendatario {
    private String comentario;
    private Integer calificacion;
}
