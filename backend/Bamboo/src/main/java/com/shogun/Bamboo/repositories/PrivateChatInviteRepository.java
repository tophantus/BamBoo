package com.shogun.Bamboo.repositories;

import com.shogun.Bamboo.entities.PrivateChatInvite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PrivateChatInviteRepository extends JpaRepository<PrivateChatInvite, UUID> {
    @Query("""
            SELECT i FROM PrivateChatInvite i
            JOIN FETCH i.recipient
            JOIN FETCH i.sender
            WHERE i.id = :inviteId
            """)
    Optional<PrivateChatInvite> findWithRecipientAndSenderById(@Param("inviteId") UUID inviteId);

    @Query("""
            SELECT i FROM PrivateChatInvite i
            JOIN FETCH i.recipient
            JOIN FETCH i.sender
            WHERE i.id IN (
                SELECT ii.id FROM PrivateChatInvite ii
                WHERE ii.status = 'PENDING' AND ii.recipient.id = :recipientId
            )
            """)
    List<PrivateChatInvite> findAllPendingInvitesByRecipient(@Param("recipientId") UUID recipientId);


    @Query("""
            SELECT i FROM PrivateChatInvite i
            WHERE (i.sender.id = :userA AND i.recipient.id = :userB)
                OR (i.sender.id = :userB and i.recipient.id = :userA)
            """)
    List<PrivateChatInvite> findAllInviteBetweenSenderAndRecipient(@Param("userA") UUID userA, @Param("userB") UUID userB);
}
