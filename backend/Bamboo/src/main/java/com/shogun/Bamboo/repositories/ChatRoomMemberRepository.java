package com.shogun.Bamboo.repositories;

import com.shogun.Bamboo.entities.ChatRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, UUID> {
    List<ChatRoomMember> findByUserId(UUID userId);
    List<ChatRoomMember> findByRoomId(UUID roomId);
    List<ChatRoomMember> findByUserEmail(String userEmail);
    boolean existsByRoomIdAndUserId(UUID roomId, UUID userId);

    boolean existsByRoomIdAndUserIdAndIsAdminTrue(UUID roomId, UUID userId);
}
