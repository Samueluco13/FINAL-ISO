package com.example.api.rest.Repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.api.rest.Model.MensajeriaModel;

public interface IMensajeriaRepository extends MongoRepository<MensajeriaModel, ObjectId>{
    List<MensajeriaModel> findByNombreUsuarioDestinatarioAndNombreUsuarioRemitenteOrderByFechaAscHoraAsc(String destinatario, String remitente);
}
