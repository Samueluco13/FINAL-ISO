package com.example.api.rest.Service;

import com.example.api.rest.Model.AcuerdoModel;
import org.bson.types.ObjectId;



public interface IAcuerdoService {
    public String crearAcuerdo(AcuerdoModel acuerdo);
    public AcuerdoModel actualizarAcuerdoPropiedad(ObjectId id, AcuerdoModel acuerdo);
    public String cancelarAcuerdoPropiedad(ObjectId id, String razonCancelacion);
}
