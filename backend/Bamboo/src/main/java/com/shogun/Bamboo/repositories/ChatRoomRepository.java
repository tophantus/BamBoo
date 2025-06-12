package com.shogun.Bamboo.repositories;

import com.shogun.Bamboo.entities.ChatRoom;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, UUID> {
    @Query("""
        SELECT r FROM ChatRoom r
        WHERE r.isPrivate = true AND
              EXISTS (
                  SELECT m1 FROM ChatRoomMember m1
                  WHERE m1.room = r AND m1.user.id = :userId1
              ) AND
              EXISTS (
                  SELECT m2 FROM ChatRoomMember m2
                  WHERE m2.room = r AND m2.user.id = :userId2
              )
    """)
    Optional<ChatRoom> findPrivateRoomBetweenUsers(@Param("userId1") UUID userId1,
                                                   @Param("userId2") UUID userId2);

    @EntityGraph(attributePaths = {"members", "members.user"})
    Optional<ChatRoom> findWithMembersById(UUID id);

    @Query("""
        SELECT DISTINCT r FROM ChatRoom r
        JOIN r.members m
        JOIN FETCH r.members
        WHERE m.user.id = :userId
    """)
    List<ChatRoom> findAllByUserId(@Param("userId") UUID userId);

}
