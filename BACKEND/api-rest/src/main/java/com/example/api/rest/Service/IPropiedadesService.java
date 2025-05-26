package com.example.api.rest.Service;


import java.util.List;

import org.bson.types.ObjectId;

import com.example.api.rest.Model.Comentarios;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.ReportePublicacionModel;
import com.example.api.rest.Model.UsuarioModel;


public interface IPropiedadesService {
    public UsuarioModel buscarUsuarioPorId(ObjectId id);
    public PropiedadesModel buscarPropiedadPorId(ObjectId id);
    public String crearPropiedad(PropiedadesModel propiedad);
    public PropiedadesModel editarInfoPropiedad(String nombre, PropiedadesModel propiedad);
    public String eliminarPropiedad(String nombre);
    public String reportarPropiedad(String nombre, ReportePublicacionModel reporte);
    public PropiedadesModel buscarPropiedadPorNombre(String nombre);
    public List<ReportePublicacionModel> buscarReportes(ObjectId idPropiedad);
    public List<ReportePublicacionModel> listarReportes(ObjectId idPropiedad);
    public List<Comentarios> listarCometarios(String nombre);
    public List<PropiedadesModel> listarPropiedadesVisibles();
    public List<PropiedadesModel> ListarPropiedadesPropias(PropiedadesModel propiedad);
    public List<PropiedadesModel> listarPropiedadesReportadas();
    public List<PropiedadesModel> listarPropiedades();
    public List<PropiedadesModel> ListarPropiedadesEnEspera();
    public PropiedadesModel hacerVisiblePropiedad(ObjectId id, Boolean visible);
    public void validarReporte(ObjectId idReporte, ReportePublicacionModel desicion);
    public ReportePublicacionModel buscarReportePorId(ObjectId idReporte);
}