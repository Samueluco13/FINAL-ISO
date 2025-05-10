package com.example.api.rest.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.api.rest.Model.NotificacionesModel;

public interface INotificacionesRepositorty extends MongoRepository<NotificacionesModel, ObjectId>{
    
}
