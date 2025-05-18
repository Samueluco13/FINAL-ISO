package com.example.api.rest.Repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.api.rest.Model.PropiedadesModel;
import com.example.api.rest.Model.ENUM.enumsDisponibilidad;
import com.example.api.rest.Model.ENUM.enumsEstadoPropiedad;

public interface IPropiedadesRepository extends MongoRepository<PropiedadesModel, ObjectId> {
    Optional<PropiedadesModel> findByNombre(String nombre);
    List<PropiedadesModel> findByIdUsuarioPropietario(ObjectId idUsuarioPropietario);
    List<PropiedadesModel> findByVisible(Boolean visibilidad);
    List<PropiedadesModel> findByDisponibilidad(enumsDisponibilidad disponibilidad);
    List<PropiedadesModel> findByEstado(enumsEstadoPropiedad estado);
    @Query("{ 'mensajeria.idUsuarioDestinatario': ?0 }")
    Optional<PropiedadesModel> findByIdUsuarioRemitente(ObjectId idUsuarioDestinatario);

}