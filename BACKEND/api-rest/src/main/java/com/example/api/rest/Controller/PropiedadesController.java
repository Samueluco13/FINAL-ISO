package com.example.api.rest.Controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.rest.Model.Comentarios;
import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.ReportePublicacionModel;
import com.example.api.rest.Service.IPropiedadesService;

@RestController
@RequestMapping("/UAO/INGSOFT/PROYECTO")
public class PropiedadesController {
    @Autowired IPropiedadesService propiedadesService;

    @PostMapping("/PROPIEDAD/CREACION")
    public ResponseEntity<String> crearPropiedad(@RequestBody PropiedadesModel propiedad){
        return new ResponseEntity<String>(propiedadesService.crearPropiedad(propiedad), HttpStatus.OK);
    }

    @PutMapping("/EDITAR/PROPIEDAD/{nombre}")
    public ResponseEntity<PropiedadesModel> editarInfoPropiedad(@PathVariable String nombre, @RequestBody PropiedadesModel propiedad){
        return new ResponseEntity<PropiedadesModel>(propiedadesService.editarInfoPropiedad(nombre, propiedad), HttpStatus.OK);
    }

    @DeleteMapping("/ELIMINAR/PROPIEDAD/{nombre}")
    public ResponseEntity<String> eliminarPropiedad(@PathVariable String nombre){
        return new ResponseEntity<String>(propiedadesService.eliminarPropiedad(nombre), HttpStatus.OK);
    }

    @PostMapping("/REPORTAR/PROPIEDAD/{nombre}")
    public ResponseEntity<String> reportarPropiedad(@PathVariable String nombre, @RequestBody ReportePublicacionModel reporte){
        return new ResponseEntity<String>(propiedadesService.reportarPropiedad(nombre, reporte), HttpStatus.OK);
    }

    @GetMapping("/LISTARCOMENTARIOS/{nombre}")
    public ResponseEntity<List<Comentarios>> listarComentarios(@PathVariable String nombre){
        return new ResponseEntity<List<Comentarios>>(propiedadesService.listarCometarios(nombre), HttpStatus.OK);
    }

    @GetMapping("/LISTARREPORTES/{idPublicacion}")
    public ResponseEntity<List<ReportePublicacionModel>> listarReportes(@PathVariable ObjectId idPublicacion){
        return new ResponseEntity<List<ReportePublicacionModel>>(propiedadesService.listarReportes(idPublicacion), HttpStatus.OK);
    }

    @GetMapping("/LISTAR-DISPONIBLES")
    public ResponseEntity<List<PropiedadesModel>> listarPropiedadesDisponibles(){
        return new ResponseEntity<List<PropiedadesModel>>(propiedadesService.listarPropiedadesVisibles(), HttpStatus.OK);
    }

    @PostMapping("/LISTAR-PROPIEDADES-PROPIAS")
    public ResponseEntity<List<PropiedadesModel>> listarPropiedadesPropias(@RequestBody PropiedadesModel propiedad){
        return new ResponseEntity<List<PropiedadesModel>>(propiedadesService.ListarPropiedadesPropias(propiedad), HttpStatus.OK);
    }

    @GetMapping("/LISTAR-PROPIEDADES-REPORTADAS")
    public ResponseEntity<List<PropiedadesModel>> listarPropiedadesReportadas(){
        return new ResponseEntity<List<PropiedadesModel>>(propiedadesService.listarPropiedadesReportadas(), HttpStatus.OK);
    }

    @GetMapping("/LISTAR-PROPIEDADES")
    public ResponseEntity<List<PropiedadesModel>> listarPropiedades(){
        return new ResponseEntity<List<PropiedadesModel>>(propiedadesService.listarPropiedades(), HttpStatus.OK);
    }

    @GetMapping("/LISTAR-PROPIEDADES-ESPERA")
    public ResponseEntity<List<PropiedadesModel>> listarPropiedadesEnEspera(){
        return new ResponseEntity<List<PropiedadesModel>>(propiedadesService.ListarPropiedadesEnEspera(), HttpStatus.OK);
    }

    @PutMapping("/PROPIEDAD-VISIBLE/{id}")
    public ResponseEntity<PropiedadesModel> hacerPropiedadVisible(@PathVariable ObjectId id){
        return new ResponseEntity<PropiedadesModel>(propiedadesService.hacerVisiblePropiedad(id), HttpStatus.OK);
    }

    @PostMapping("/PROPIEDAD/{nombre}")
    public ResponseEntity<PropiedadesModel> infoPropiedad(@PathVariable String nombre){
        return new ResponseEntity<PropiedadesModel>(propiedadesService.buscarPropiedadPorNombre(nombre), HttpStatus.OK);
    }

    @PutMapping("/PROPIEDAD/APROBAR-REPORTE/{idReporte}")
    public ResponseEntity<String> aprobarReportes(@PathVariable ObjectId idReporte, @RequestBody ReportePublicacionModel desicion){
        propiedadesService.validarReporte(idReporte, desicion);
        return new ResponseEntity<String>("Desicion guardada con exito", HttpStatus.OK);
    }
}