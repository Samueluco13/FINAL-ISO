package com.example.api.rest.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.api.rest.Model.UsuarioModel;

public interface IUsuarioRepository extends MongoRepository<UsuarioModel, ObjectId>{
    Optional<UsuarioModel> findByUserName(String userName);
    Optional<UsuarioModel> findByEmail(String email);
}
