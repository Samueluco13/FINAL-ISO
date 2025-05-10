package com.example.api.rest.Repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.api.rest.Model.ReportePublicacionModel;

public interface IReportePublicacionRepository extends MongoRepository<ReportePublicacionModel, ObjectId> {
    Optional<List<ReportePublicacionModel>> findByIdPublicacion(ObjectId idPublicacion);
}
