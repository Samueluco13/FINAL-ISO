package com.example.api.rest.Repository;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.api.rest.Model.ChatsModel;

public interface IChatsRepository extends MongoRepository<ChatsModel, ObjectId>{
    @Query("{ 'participantes': { $all: ?0 }, $expr: { $eq: [ { $size: '$participantes' }, 2 ] } }")
    Optional<ChatsModel> findChatByExactTwoParticipants(List<String> participantes);
    List<ChatsModel> findByParticipantesContaining(String nombreUsuario);
}
