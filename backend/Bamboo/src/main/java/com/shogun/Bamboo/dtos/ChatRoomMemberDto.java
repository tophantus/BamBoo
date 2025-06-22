package com.shogun.Bamboo.dtos;

import com.shogun.Bamboo.auth.dtos.UserDetailsDto;
import com.shogun.Bamboo.entities.ChatRoom;
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
public class ChatRoomMemberDto {
    private UUID id;
    private UserDetailsDto user;
    private UUID roomId;
    private boolean admin;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
