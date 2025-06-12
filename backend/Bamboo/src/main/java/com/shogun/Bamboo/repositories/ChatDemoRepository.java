package com.shogun.Bamboo.repositories;

import com.shogun.Bamboo.entities.ChatDemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChatDemoRepository extends JpaRepository<ChatDemo, UUID> {

    @Query("""
        SELECT c FROM ChatDemo c
        JOIN FETCH c.sender
        JOIN FETCH c.recipient
        WHERE (c.sender.id = :userId1 AND c.recipient.id = :userId2)
           OR (c.sender.id = :userId2 AND c.recipient.id = :userId1)
        ORDER BY c.createdDate ASC
        """)
    List<ChatDemo> findMessagesBetweenUsers(@Param("userId1") UUID userId1, @Param("userId2") UUID userId2);
}
