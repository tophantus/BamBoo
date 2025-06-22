package com.shogun.Bamboo.entities;

import com.shogun.Bamboo.auth.entities.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

@Table(name = "private_chat_invite")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PrivateChatInvite extends BaseAuditEntity{
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sender", nullable = false)
    private User sender;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient", nullable = false)
    private User recipient;

    @Enumerated(EnumType.STRING)
    private PrivateChatInviteStatus status;
}
