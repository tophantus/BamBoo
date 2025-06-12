package com.shogun.Bamboo.entities;

import com.shogun.Bamboo.auth.entities.User;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Table(name = "chat_messages")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ChatMessage extends BaseAuditEntity{
    @Id
    @GeneratedValue
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String text;

    private String image;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private ChatRoom room;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
}
