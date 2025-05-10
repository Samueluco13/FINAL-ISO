package com.example.api.rest.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.api.rest.Model.AcuerdoModel;
import com.example.api.rest.Model.PropiedadesModel;

public interface IAcuerdoRepository extends MongoRepository<AcuerdoModel, ObjectId>{
    Optional<PropiedadesModel> findByNombrePropiedad(String nombrePropiedad); 
}
