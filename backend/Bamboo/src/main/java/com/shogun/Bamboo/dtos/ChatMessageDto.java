package com.shogun.Bamboo.dtos;

import com.shogun.Bamboo.auth.dtos.UserDetailsDto;
import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.entities.ChatRoom;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageDto {
    private UUID id;
    private String text;
    private String image;
    private UUID roomId;
    private UUID senderId;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
