package com.example.api.rest.Service;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.AcuerdoCamposObligatoriosVacios;
import com.example.api.rest.Excepciones.AcuerdoCanceladoFinalizado;
import com.example.api.rest.Excepciones.AcuerdoCaracteres;
import com.example.api.rest.Excepciones.AcuerdoFechaFinalizacionFechaInicio;
import com.example.api.rest.Excepciones.AcuerdoFechaParaActualizar;
import com.example.api.rest.Excepciones.AcuerdoNoEncontrado;
import com.example.api.rest.Excepciones.AcuerdoPropiedadNoEncontrada;
import com.example.api.rest.Model.AcuerdoModel;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.ENUM.enumsDisponibilidad;
import com.example.api.rest.Model.ENUM.enumsEstadoAcuerdo;
import com.example.api.rest.Repository.IAcuerdoRepository;
import com.example.api.rest.Repository.IPropiedadesRepository;
import org.bson.types.ObjectId;


@Service
public class AcuerdoServiceImp implements IAcuerdoService {
    @Autowired IAcuerdoRepository acuerdoRepositorio;
    @Autowired IPropiedadesRepository propiedadesRepositorio;

    @Override
    public PropiedadesModel buscarPropiedadAcuerdo(ObjectId id) {
        return propiedadesRepositorio.findById(id).orElse(null);
    }

    @Override
    public AcuerdoModel buscarAcuerdoPorId(ObjectId id){
        return acuerdoRepositorio.findById(id).orElse(null);
    }

    @Override
    public String crearAcuerdo(ObjectId id, AcuerdoModel acuerdo) {

        PropiedadesModel propiedadEncontrada = buscarPropiedadAcuerdo(id);
        if(propiedadEncontrada == null){
            throw new AcuerdoPropiedadNoEncontrada("Propiedad no encontrada");
        }

        //Validamos que todos los campos obligatorios estén completos
        if (acuerdo.getNombrePropiedad() == null || acuerdo.getEstado() == null ||
            acuerdo.getFechaInicio() == null || acuerdo.getFechaFin() == null) {
            throw new AcuerdoCamposObligatoriosVacios("Todos los campos obligatorios deben estar completos");
        }

        //Validamos que la fecha de finalización no sea anterior a la fecha de inicio
        if (acuerdo.getFechaFin().before(acuerdo.getFechaInicio())) {
            throw new AcuerdoFechaFinalizacionFechaInicio("La fecha de finalización no puede ser anterior a la fecha de inicio");
        }


        acuerdoRepositorio.save(acuerdo);
        propiedadEncontrada.setDisponibilidad(enumsDisponibilidad.arrendado);
        propiedadEncontrada.setVisible(false);
        propiedadesRepositorio.save(propiedadEncontrada);
        return "El Acuerdo para la propiedad: " + acuerdo.getNombrePropiedad() + " fue creado con exito";
    }

    @Override
    public AcuerdoModel actualizarAcuerdoPropiedad(ObjectId id, AcuerdoModel acuerdo) {
        AcuerdoModel acuerdoEncontrado = buscarAcuerdoPorId(id);
        if(acuerdoEncontrado == null){
            throw new AcuerdoNoEncontrado("Acuerdo no encontrado");
        }

        //Validamos que el acuerdo no haya sido cancelado o haya finalizado
        if (acuerdoEncontrado.getEstado().equals(enumsEstadoAcuerdo.cancelado) || acuerdoEncontrado.getEstado().equals(enumsEstadoAcuerdo.finalizado)) {
            throw new AcuerdoCanceladoFinalizado("Los acuerdos cancelados o finalizados no se pueden modificar.");
        }
         //Validamos que la nueva fecha de finalización esté después de la fecha actual
        if(acuerdo.getFechaFin().before(new Date())){
            throw new AcuerdoFechaParaActualizar("La fecha ingresada debe ser mayor a la actual");
        }

        //Actualizamos la fecha de finalizacion
        acuerdoEncontrado.setFechaFin(acuerdo.getFechaFin());

        //Se registra la renovacion en el historial
        acuerdoEncontrado.getHistorialRenovaciones().add(new Date());

        return acuerdoRepositorio.save(acuerdoEncontrado);
    }

    @Override
    public String cancelarAcuerdoPropiedad(ObjectId id, String razonCancelacion) {
        AcuerdoModel acuerdoEncontrado = buscarAcuerdoPorId(id);
        if(acuerdoEncontrado == null){
            throw new AcuerdoNoEncontrado("Acuerdo no encontrado");
        }
        
        if (acuerdoEncontrado.getEstado().equals(enumsEstadoAcuerdo.finalizado)) {
            throw new AcuerdoCanceladoFinalizado("No se puede cancelar un acuerdo que ya ha finalizado");
        }

        if (razonCancelacion == null || razonCancelacion.trim().length() < 20) {
            throw new AcuerdoCaracteres("La razón de cancelación debe tener al menos 20 carácteres.");
        }

        acuerdoEncontrado.setEstado(enumsEstadoAcuerdo.cancelado);
        acuerdoEncontrado.setRazonCancelacion(razonCancelacion);

        //Si se cancela antes de la fecha de inicio, se cuelve a publicar el aviso como "Disponible"
        if (acuerdoEncontrado.getFechaInicio().after(new Date())) {
            PropiedadesModel propiedadAModificar = buscarPropiedadAcuerdo(id);
            propiedadAModificar.setDisponibilidad(enumsDisponibilidad.disponible);
            propiedadesRepositorio.save(propiedadAModificar);
        }else{
            //Si la cancelación pasa durante el periodo de arrendamiento, la registramos en el historial
            acuerdoEncontrado.getHistorialCancelaciones().add(new Date());
        }
        acuerdoRepositorio.save(acuerdoEncontrado);
        return "El acuerdo se ha cancelado exitosamente.";
}
}