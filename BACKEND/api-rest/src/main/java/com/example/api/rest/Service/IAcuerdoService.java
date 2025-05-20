package com.example.api.rest.Service;

import com.example.api.rest.Model.AcuerdoModel;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.UsuarioModel;

import org.bson.types.ObjectId;



public interface IAcuerdoService {
    public String crearAcuerdo(ObjectId id, AcuerdoModel acuerdo);
    public PropiedadesModel buscarPropiedadAcuerdo(ObjectId id);
    public AcuerdoModel buscarAcuerdoPorId(ObjectId id);
    public AcuerdoModel actualizarAcuerdoPropiedad(ObjectId id, AcuerdoModel acuerdo);
    public String cancelarAcuerdoPropiedad(ObjectId id, String razonCancelacion);
    public String calificarExperienciaPropiedad(AcuerdoModel acuerdoCaloficacion);
    public String calificarExperienciaArrendatario(AcuerdoModel acuerdoCalificacion);
    public UsuarioModel buscarUsuario(ObjectId idUsuario);
}
