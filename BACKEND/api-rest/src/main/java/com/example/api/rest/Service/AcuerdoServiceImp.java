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
import com.example.api.rest.Model.NotificacionesModel;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Model.ENUM.enumsDisponibilidad;
import com.example.api.rest.Model.ENUM.enumsEstadoAcuerdo;
import com.example.api.rest.Model.ENUM.enumsNotificaciones;
import com.example.api.rest.Repository.IAcuerdoRepository;
import com.example.api.rest.Repository.INotificacionesRepositorty;
import com.example.api.rest.Repository.IPropiedadesRepository;
import com.example.api.rest.Repository.IUsuarioRepository;

import org.bson.types.ObjectId;


@Service
public class AcuerdoServiceImp implements IAcuerdoService {
    @Autowired IAcuerdoRepository acuerdoRepositorio;
    @Autowired IPropiedadesRepository propiedadesRepositorio;
    @Autowired IUsuarioRepository usuarioRepositorio;
    @Autowired INotificacionesRepositorty notificacionesRepositorio;

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
            ObjectId idPropiedad = acuerdoEncontrado.getIdPropiedad();
            PropiedadesModel propiedadAModificar = buscarPropiedadAcuerdo(idPropiedad);
            if (propiedadAModificar == null) {
                throw new AcuerdoPropiedadNoEncontrada("Propiedad no encontrada al cancelar acuerdo");
            }
            propiedadAModificar.setDisponibilidad(enumsDisponibilidad.disponible);
            propiedadAModificar.setVisible(true);
            propiedadesRepositorio.save(propiedadAModificar);
        }else{
            //Si la cancelación pasa durante el periodo de arrendamiento, la registramos en el historial
            acuerdoEncontrado.getHistorialCancelaciones().add(new Date());
        }
        acuerdoRepositorio.save(acuerdoEncontrado);
        return "El acuerdo se ha cancelado exitosamente.";
    }

    @Override
    public UsuarioModel buscarUsuario(ObjectId idUsuario) {
        return usuarioRepositorio.findById(idUsuario).orElseThrow(null);
    }

    @Override
    public String calificarExperienciaPropiedad(AcuerdoModel acuerdoCalificacion) {
        AcuerdoModel acuerdoEncontrado = buscarAcuerdoPorId(acuerdoCalificacion.getIdPropiedad());
        PropiedadesModel propiedadEncontrada = buscarPropiedadAcuerdo(acuerdoCalificacion.getIdPropiedad());

        UsuarioModel usuarioEncontradoCreador = buscarUsuario(acuerdoCalificacion.getIdUsuarioInteresado());
        UsuarioModel usuarioEncontradoDestinatario = buscarUsuario(propiedadEncontrada.getIdUsuarioPropietario());
        for(int i = 0; i < acuerdoCalificacion.getCalificacionEspacio().size(); i++){
            acuerdoEncontrado.getCalificacionEspacio().add(acuerdoCalificacion.getCalificacionEspacio().get(i));
            propiedadEncontrada.setPromedioCalificacion(acuerdoCalificacion.getCalificacionEspacio().get(i).getCalificacion());
            Date fechaActual = new Date();
            NotificacionesModel notificacion = new NotificacionesModel(enumsNotificaciones.calificacion, fechaActual, usuarioEncontradoCreador.getNombre(), "El usuario con nombre: " + usuarioEncontradoCreador.getNombre() + " ,ha hecho una calificacion a la propiedad: " + propiedadEncontrada.getNombre(), usuarioEncontradoDestinatario.getNombre());
            propiedadesRepositorio.save(propiedadEncontrada);
            notificacionesRepositorio.save(notificacion);
            acuerdoRepositorio.save(acuerdoEncontrado);
        }
        return "Has realizado una calificacion a la propiedad: " + propiedadEncontrada.getNombre();
    }

    @Override
    public String calificarExperienciaArrendatario(AcuerdoModel acuerdoCalificacion) {
        AcuerdoModel acuerdoEncontrado = buscarAcuerdoPorId(acuerdoCalificacion.getIdPropiedad());
        PropiedadesModel propiedadEncontrada = buscarPropiedadAcuerdo(acuerdoCalificacion.getIdPropiedad());

        UsuarioModel usuarioInteresado = buscarUsuario(acuerdoCalificacion.getIdUsuarioInteresado());
        UsuarioModel usuarioPropietario = buscarUsuario(propiedadEncontrada.getIdUsuarioPropietario());

        for(int i = 0; i < acuerdoCalificacion.getCalificacionArrendatario().size(); i++){
            acuerdoEncontrado.getCalificacionArrendatario().add(acuerdoCalificacion.getCalificacionArrendatario().get(i));
            usuarioInteresado.setPromedioCalificacion(acuerdoCalificacion.getCalificacionArrendatario().get(i).getCalificacion());
            Date fechaActual = new Date();
            NotificacionesModel notificacion = new NotificacionesModel(enumsNotificaciones.calificacion, fechaActual, usuarioPropietario.getNombre(), "El usuario con nombre: " + usuarioPropietario.getNombre() + " ,ha hecho una calificacion hacia ti", usuarioInteresado.getNombre());
            acuerdoRepositorio.save(acuerdoEncontrado);
            usuarioRepositorio.save(usuarioInteresado);
            notificacionesRepositorio.save(notificacion);
        }
        return "Has realizado una calificacion a el usuario: " + usuarioInteresado.getNombre();
    }  
}