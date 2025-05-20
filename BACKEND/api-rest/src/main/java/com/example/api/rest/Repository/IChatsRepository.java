package com.example.api.rest.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.api.rest.Model.ChatsModel;

public interface IChatsRepository extends MongoRepository<ChatsModel, ObjectId>{
    List<ChatsModel> findByNombreUsuarioDestinatarioAndNombreUsuarioRemitenteOrderByFechaAscHoraAsc(String destinatario, String remitente);
    List<ChatsModel> findByNombreUsuarioDestinatario(String nombreUsuarioDestinatario);
    Optional<ChatsModel> findByNombreUsuarioDestinatarioAndNombreUsuarioRemitente(String nombreUsuarioDestinatario, String nombreUsuarioRemitente);

}
