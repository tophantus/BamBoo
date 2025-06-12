package com.shogun.Bamboo.entities;

import com.shogun.Bamboo.auth.entities.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Table(name = "chat_room_members")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ChatRoomMember {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private ChatRoom room;

    @Column(nullable = false)
    private boolean isAdmin=false;

}
