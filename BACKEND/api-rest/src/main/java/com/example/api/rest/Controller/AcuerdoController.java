package com.example.api.rest.Controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.rest.Model.AcuerdoModel;
import com.example.api.rest.Service.IAcuerdoService;

@RestController
@RequestMapping("/UAO/INGSOFT/PROYECTO/ACUERDO")
public class AcuerdoController {
    
    @Autowired
    private IAcuerdoService acuerdoService;

    @PostMapping("/REGISTRAR/{id}")
    public ResponseEntity<String> crearAcuerdo(@PathVariable ObjectId id, @RequestBody AcuerdoModel acuerdo){
        return new ResponseEntity<String>(acuerdoService.crearAcuerdo(id, acuerdo), HttpStatus.OK);
    }

    @PutMapping("/ACTUALIZAR/{id}")
    public ResponseEntity<AcuerdoModel> actualizarAcuerdo(@PathVariable ObjectId id, @RequestBody AcuerdoModel acuerdo){
        return new ResponseEntity<AcuerdoModel>(acuerdoService.actualizarAcuerdoPropiedad(id, acuerdo), HttpStatus.OK);
    }

    @PutMapping("CANCELAR/{id}")
    public ResponseEntity<String> cancelarAcuerdo(@PathVariable ObjectId id, @RequestParam String razonCancelacion){
        return new ResponseEntity<String>(acuerdoService.cancelarAcuerdoPropiedad(id, razonCancelacion), HttpStatus.OK);
    }

    @PutMapping("/CALIFICAR-ACUERDO-PROPIEDAD")
    public ResponseEntity<String> calificarAcuerdoPropiedad(@RequestBody AcuerdoModel calificacion){
        return new ResponseEntity<String>(acuerdoService.calificarExperienciaPropiedad(calificacion), HttpStatus.OK);
    }

    @PutMapping("/CALIFICAR-ACUERDO-ARRENDATARIO")
    public ResponseEntity<String> calificarAcuerdoArrendatario(@RequestBody AcuerdoModel calificacion){
        return new ResponseEntity<String>(acuerdoService.calificarExperienciaArrendatario(calificacion), HttpStatus.OK);
    }
}
