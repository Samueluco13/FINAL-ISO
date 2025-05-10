package com.example.api.rest.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.api.rest.Excepciones.AcuerdoNombreNoEncontrado;
import com.example.api.rest.Model.AcuerdoModel;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Repository.IAcuerdoRepository;

public class AcuerdoServiceImp implements IAcuerdoService {
    @Autowired IAcuerdoRepository acuerdoRepositorio;


    @Override
    public PropiedadesModel buscarPropiedadAcuerdo(String nombrePropiedad) {
        Optional<PropiedadesModel> propiedad = acuerdoRepositorio.findByNombrePropiedad(nombrePropiedad);
        return propiedad.orElse(null);
    }


    @Override
    public String crearAcuerdo(AcuerdoModel acuerdo) {
        acuerdoRepositorio.save(acuerdo);
        return "Acuerdo para la propiedad: " + acuerdo.getNombrePropiedad() + " creado con exito";
    }

    @Override
    public AcuerdoModel actualizarAcuerdo(String nombrePropiedad, AcuerdoModel acuerdo) {
        PropiedadesModel propiedad = buscarPropiedadAcuerdo(nombrePropiedad);
        if(propiedad == null){
            throw new AcuerdoNombreNoEncontrado("Acuerdo no encontrado para la propiedad: " + nombrePropiedad);
        }
        //AcuerdoModel acuerdoEncontrado = buscarAcuerdo(nombrePropiedad);
        
        return null;

    }

    
}
