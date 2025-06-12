package com.shogun.Bamboo.repositories;

import com.shogun.Bamboo.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {
    List<ChatMessage> findByRoomIdOrderByCreatedDateAsc(UUID roomId);
    List<ChatMessage> findBySenderIdOrderByCreatedDateDesc(UUID senderId);

    @Query("""
        SELECT m FROM ChatMessage m
        JOIN FETCH m.sender
        WHERE m.room.id = :roomId
        ORDER BY m.createdAt ASC
    """)
    List<ChatMessage> findAllByRoomId(@Param("roomId") UUID roomId);
}
