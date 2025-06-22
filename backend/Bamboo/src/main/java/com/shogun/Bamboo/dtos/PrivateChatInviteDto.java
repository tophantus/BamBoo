package com.shogun.Bamboo.dtos;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.entities.PrivateChatInviteStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PrivateChatInviteDto {
    private UUID id;
    private User sender;
    private User recipient;
    private PrivateChatInviteStatus status;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
