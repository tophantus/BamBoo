package com.shogun.Bamboo.dtos;

import com.shogun.Bamboo.entities.ChatMessage;
import com.shogun.Bamboo.entities.ChatRoomMember;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomDto {
    private UUID id;
    private String name;
    private boolean privateChat;
    private List<ChatRoomMemberDto> members;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
