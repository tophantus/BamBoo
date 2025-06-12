package com.shogun.Bamboo.dtos;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatDemoRequest {
    private String text;
    private String image;
    private UUID recipientId;
    private UUID senderId;
}
