package com.example.api.rest.Service;

import com.example.api.rest.Model.AcuerdoModel;
import com.example.api.rest.Model.PropiedadesModel;

public interface IAcuerdoService {
    public String crearAcuerdo(AcuerdoModel acuerdo);
    public AcuerdoModel actualizarAcuerdo(String nombrePropiedad, AcuerdoModel acuerdo);
    public PropiedadesModel buscarPropiedadAcuerdo(String nombrePropiedad);
}
