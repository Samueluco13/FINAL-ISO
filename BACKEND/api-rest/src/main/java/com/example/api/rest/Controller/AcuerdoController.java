package com.example.api.rest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.rest.Model.AcuerdoModel;
import com.example.api.rest.Service.IAcuerdoService;

@RestController
@RequestMapping("/UAO/INGSOFT/PROYECTO/ACUERDO")
public class AcuerdoController {
    
    @Autowired
    private IAcuerdoService acuerdoService;

    @PostMapping("/REGISTRAR")
    public ResponseEntity<String> crearAcuerdo(@RequestBody AcuerdoModel acuerdo){
        return new ResponseEntity<String>(acuerdoService.crearAcuerdo(acuerdo), HttpStatus.OK);
    }
}
