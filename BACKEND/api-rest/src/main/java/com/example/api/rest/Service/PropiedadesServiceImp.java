package com.example.api.rest.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.rest.Excepciones.ImagenesInvalido;
import com.example.api.rest.Excepciones.PropiedadDescripcionInvalida;
import com.example.api.rest.Excepciones.PropiedadNoEncontrada;
import com.example.api.rest.Excepciones.PropiedadSinComentarios;
import com.example.api.rest.Excepciones.PropiedadSinReportes;
import com.example.api.rest.Excepciones.PropiedadYaExistente;
import com.example.api.rest.Excepciones.ValorCostoInvalido;
import com.example.api.rest.Model.Comentarios;
import com.example.api.rest.Model.NotificacionesModel;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.ReportePublicacionModel;
import com.example.api.rest.Model.UsuarioModel;
import com.example.api.rest.Model.ENUM.enumsEstadoPropiedad;
import com.example.api.rest.Model.ENUM.enumsNotificaciones;
import com.example.api.rest.Repository.IChatsRepository;
import com.example.api.rest.Repository.INotificacionesRepositorty;
import com.example.api.rest.Repository.IPropiedadesRepository;
import com.example.api.rest.Repository.IReportePublicacionRepository;
import com.example.api.rest.Repository.IUsuarioRepository;

@Service
public class PropiedadesServiceImp implements IPropiedadesService {
    @Autowired IPropiedadesRepository propiedadesRepositorio;
    @Autowired IReportePublicacionRepository reportePublicacionRepositorio;
    @Autowired IUsuarioRepository usuarioRepositorio;
    @Autowired INotificacionesRepositorty notificacionesRepositorio;
    @Autowired IChatsRepository mensajeriaRepositorio;

    @Override
    public UsuarioModel buscarUsuarioPorId(ObjectId id) {
        return usuarioRepositorio.findById(id).orElse(null);
    }

    @Override
    public PropiedadesModel buscarPropiedadPorId(ObjectId id) {
        return propiedadesRepositorio.findById(id).orElse(null);
    }

    @Override
    public PropiedadesModel buscarPropiedadPorNombre(String nombre) {
        Optional<PropiedadesModel> propiedad = propiedadesRepositorio.findByNombre(nombre);
        return propiedad.orElse(null);
    }

    @Override
    public String crearPropiedad(PropiedadesModel propiedad) {
        PropiedadesModel propiedadEncontrada = buscarPropiedadPorNombre(propiedad.getNombre());
        if(propiedadEncontrada != null){
            throw new PropiedadYaExistente("La propiedad que intenta registrar con dicho nombre ya existe");
        }
        //Validamos el formato del precio
        if(propiedad.getCosto() <= 0){
            throw new ValorCostoInvalido("El precio debe ser un valos numérico positivo");
        }
        if(propiedad.getCosto() < 500000 || propiedad.getCosto() > 10000000){
            throw new ValorCostoInvalido("El rango del precio debe ser entre 500.000 y 10.000.000");
        }

        //Validamos el formato de las imágenes
        if(propiedad.getImagenes().size() == 0){
            throw new ImagenesInvalido("Debe haber almenos una imagen");
        }
        Date fechaActual = new Date();
        UsuarioModel usuarioEncontrado = buscarUsuarioPorId(propiedad.getIdUsuarioPropietario());
        NotificacionesModel notificacion = new NotificacionesModel(enumsNotificaciones.aviso, fechaActual, "Haz creado una nueva publicacion llamada " + propiedad.getNombre(),  usuarioEncontrado.getUserName());
        NotificacionesModel notificacionParaAdministrador = new NotificacionesModel(enumsNotificaciones.aviso, fechaActual, "El usuario" + usuarioEncontrado.getUserName() + " ,ha solicitado crear una publicacion con nombre: " + propiedad.getNombre(), "Pepe");
        propiedadesRepositorio.save(propiedad);
        notificacionesRepositorio.save(notificacion);
        notificacionesRepositorio.save(notificacionParaAdministrador);
        return "La propiedad: " + propiedad.getNombre() + " ,ha sido creada con exito";
    }

    @Override
    public PropiedadesModel editarInfoPropiedad(String nombre, PropiedadesModel propiedad) {

        //Buscamos la propiedad
        PropiedadesModel propiedadEncontrada = buscarPropiedadPorNombre(nombre);
        if (propiedadEncontrada == null) {
            throw new PropiedadNoEncontrada("La propiedad no existe o no se encontró.");
        }
        if(!propiedadEncontrada.getNombre().equals(propiedad.getNombre())){
            PropiedadesModel propiedadPorNombre = buscarPropiedadPorNombre(propiedad.getNombre());
            if(propiedadPorNombre != null){
                throw new PropiedadYaExistente("Cambia el nombre de la propiedad, ya existe una propiedad con ese nombre");
            }
        }

        if(propiedad.getImagenes().size() == 0){
            throw new ImagenesInvalido("Debe haber almenos una imagen");
        }        

        if(propiedad.getCosto() < 500000 || propiedad.getCosto() > 10000000){
            throw new ValorCostoInvalido("El rango del precio debe ser entre 500.000 y 10.000.000");
        }

        if(propiedad.getDescripcion().length() > 500){
            throw new PropiedadDescripcionInvalida("La descripcion no puede exceder mas de 500 caracteres");
        }
        
        if(propiedad.getCondiciones().length() > 500){
            throw new PropiedadDescripcionInvalida("Las condiciones no pueden exceder mas de 500 caracteres");
        }

        //Validamos y actualizamos el estado del aviso
        propiedadEncontrada.setVisible(false);
        propiedadEncontrada.setEstado(enumsEstadoPropiedad.procesando);
        // Actualizamos los datos de la propiedad
        propiedadEncontrada.setNombre(propiedad.getNombre());
        propiedadEncontrada.setCondiciones(propiedad.getCondiciones());
        propiedadEncontrada.setDescripcion(propiedad.getDescripcion());
        propiedadEncontrada.setCosto(propiedad.getCosto());
        propiedadEncontrada.setImagenes(propiedad.getImagenes());

        Date fechaActual = new Date();
        UsuarioModel usuarioDueño = buscarUsuarioPorId(propiedadEncontrada.getIdUsuarioPropietario());
        NotificacionesModel notificacionParaAdministrador = new NotificacionesModel(enumsNotificaciones.aviso, fechaActual, "El usuario" + usuarioDueño.getUserName() +  ", ha solicitado una actualizacion a la publicacion con nombre: " + nombre, "Pepe");

        notificacionesRepositorio.save(notificacionParaAdministrador);
        propiedadesRepositorio.save(propiedadEncontrada);
        return propiedadEncontrada;
    }

    @Override
    public String eliminarPropiedad(String nombre) {
        PropiedadesModel propiedadEncontrada =buscarPropiedadPorNombre(nombre);
        propiedadesRepositorio.delete(propiedadEncontrada);
        String nombrePropiedadEliminada = propiedadEncontrada.getNombre();
        List<ReportePublicacionModel> reportes = listarReportes(propiedadEncontrada.getId());
        for(int i = 0; i < reportes.size(); i++){
            reportePublicacionRepositorio.delete(reportes.get(i));
        }
        return "La propiedad con el nombre: " + nombrePropiedadEliminada + ", ha sido eliminada con éxito.";
    
    }

    @Override
    public String reportarPropiedad(String nombre, ReportePublicacionModel reporte) {
        PropiedadesModel propiedad = buscarPropiedadPorNombre(nombre);
        if (propiedad != null){
            propiedad.setEstado(enumsEstadoPropiedad.reportado);
            propiedadesRepositorio.save(propiedad);
            reportePublicacionRepositorio.save(reporte);
            UsuarioModel usuarioCreadorEncontrado = buscarUsuarioPorId(reporte.getIdUsuario());
            UsuarioModel usuarioPropietarioReportado = buscarUsuarioPorId(propiedad.getIdUsuarioPropietario());
            PropiedadesModel propiedadReportadaEncontrada = buscarPropiedadPorId(reporte.getIdPublicacion());
            NotificacionesModel notificacion = new NotificacionesModel(enumsNotificaciones.aviso, reporte.getFecha(), usuarioCreadorEncontrado.getUserName(), "El usuario: " + usuarioCreadorEncontrado.getUserName() + " ha reportado la publicacion con el nombre: " + propiedadReportadaEncontrada.getNombre() + ".", usuarioPropietarioReportado.getUserName());
            NotificacionesModel notificacionParaAdministrador = new NotificacionesModel(enumsNotificaciones.aviso, reporte.getFecha(), "El usuario" + usuarioCreadorEncontrado.getUserName() +  ", ha reportado la publicacion con nombre: " + nombre, "Pepe");
            notificacionesRepositorio.save(notificacionParaAdministrador);
            notificacionesRepositorio.save(notificacion);
            return "La propiedad ha sido reportada con éxito.";  
        }
        throw new PropiedadNoEncontrada("Propiedad no encontrada.");
    }

    @Override
    public List<ReportePublicacionModel> buscarReportes(ObjectId idPropiedad) {
        Optional<List<ReportePublicacionModel>> reportes = reportePublicacionRepositorio.findByIdPublicacion(idPropiedad);
        return reportes.orElse(null);
    }

    @Override
    public List<ReportePublicacionModel> listarReportes(ObjectId idPropiedad) {
        List<ReportePublicacionModel> reportes = buscarReportes(idPropiedad);
        if(reportes.size() == 0){
            throw new PropiedadSinReportes("La propiedad no cuenta con reportes asociados");
        }
        return reportes;
    }

    @Override
    public List<Comentarios> listarCometarios(String nombre) {
        PropiedadesModel propiedadEncontrada = buscarPropiedadPorNombre(nombre);
        if(propiedadEncontrada.getComentarios().size() == 0){
            throw new PropiedadSinComentarios("La propiedad con el nombre " + nombre + " ,no tiene comentarios asociados");
        }
        List<Comentarios> comentarios = new ArrayList<>();
        for(int i=0; i < propiedadEncontrada.getComentarios().size(); i++){
            comentarios.add(propiedadEncontrada.getComentarios().get(i));
        }
        return comentarios;
    }

    @Override
    public List<PropiedadesModel> listarPropiedadesVisibles() {
        List<PropiedadesModel> propiedadesDisponibles = propiedadesRepositorio.findByVisible(true);
        return propiedadesDisponibles;
    }

    @Override
    public List<PropiedadesModel> ListarPropiedadesPropias(PropiedadesModel propiedad) {
        List<PropiedadesModel> propiedadesPropias = propiedadesRepositorio.findByIdUsuarioPropietario(propiedad.getIdUsuarioPropietario());
        return propiedadesPropias;
    }

    @Override
    public List<PropiedadesModel> listarPropiedadesReportadas() {
        List<PropiedadesModel> propiedadesReportadas = propiedadesRepositorio.findByEstado(enumsEstadoPropiedad.reportado);
        return propiedadesReportadas;
    }

    @Override
    public List<PropiedadesModel> listarPropiedades() {
        List<PropiedadesModel> propiedades = propiedadesRepositorio.findAll();
        return propiedades;
    }

    @Override
    public List<PropiedadesModel> ListarPropiedadesEnEspera() {
        List<PropiedadesModel> propiedadesEnEspera = propiedadesRepositorio.findByEstado(enumsEstadoPropiedad.procesando);
        return propiedadesEnEspera;
    }

    @Override
    public PropiedadesModel hacerVisiblePropiedad(ObjectId id) {
        PropiedadesModel propiedadEncontrada = buscarPropiedadPorId(id);
        propiedadEncontrada.setVisible(true);
        propiedadEncontrada.setEstado(enumsEstadoPropiedad.activo);
        propiedadesRepositorio.save(propiedadEncontrada);
        return propiedadEncontrada;
    }

    @Override
    public ReportePublicacionModel buscarReportePorId(ObjectId idReporte) {
        return reportePublicacionRepositorio.findById(idReporte).orElse(null);
    }

    @Override
    public void validarReporte(ObjectId idReporte, ReportePublicacionModel desicion) {
        ReportePublicacionModel reporte = buscarReportePorId(idReporte);
        PropiedadesModel publicacion = buscarPropiedadPorId(reporte.getIdPublicacion());
        UsuarioModel usuarioPropiedad = buscarUsuarioPorId(publicacion.getIdUsuarioPropietario());
        if(desicion.getValido() == true){
            publicacion.setVisible(false);
            publicacion.setEstado(enumsEstadoPropiedad.desactivado);
            propiedadesRepositorio.save(publicacion);
            Date fechaRealizacion = new Date();
            NotificacionesModel notificacion = new NotificacionesModel(enumsNotificaciones.mensaje, fechaRealizacion, "ADMINISTRACION", desicion.getDesicion() , usuarioPropiedad.getUserName());
            notificacionesRepositorio.save(notificacion);
            propiedadesRepositorio.save(publicacion);
            reportePublicacionRepositorio.delete(reporte);
        }else if(desicion.getValido() == false){
            publicacion.setVisible(true);
            publicacion.setEstado(enumsEstadoPropiedad.activo);
            propiedadesRepositorio.save(publicacion);
            Date fechaRealizacion = new Date();
            NotificacionesModel notificacion = new NotificacionesModel(enumsNotificaciones.mensaje, fechaRealizacion, "ADMINISTRACION", desicion.getDesicion() , reporte.getNombreUsuarioReporte());
            notificacionesRepositorio.save(notificacion);
            reportePublicacionRepositorio.delete(reporte);
        }
    }
    
}