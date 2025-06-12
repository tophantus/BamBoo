package com.shogun.Bamboo.dtos;

import java.util.UUID;

public class ChatMessageRequest {
    private String text;
    private String image;
    private UUID senderId;
    private UUID roomId;
}
