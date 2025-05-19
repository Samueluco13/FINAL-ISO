package com.example.api.rest.Model;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventosHistorial {
    private Date fechaEvento;
    private String tipoEvento;
    private String descripcion;

}
