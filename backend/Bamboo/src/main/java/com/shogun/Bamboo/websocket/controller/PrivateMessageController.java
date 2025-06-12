package com.shogun.Bamboo.websocket.controller;

import com.shogun.Bamboo.dtos.ChatDemoDto;
import com.shogun.Bamboo.dtos.ChatDemoRequest;
import com.shogun.Bamboo.services.ChatDemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class PrivateMessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatDemoService chatDemoService;

    @MessageMapping("/chat/private")
    public void sendPrivateMessage(@Payload ChatDemoRequest chatDemoRequest, Principal principal) {
        UUID senderId = UUID.fromString(principal.getName());
        chatDemoRequest.setSenderId(senderId);
        ChatDemoDto chatDemoDto = chatDemoService.saveChatToDb(
                chatDemoRequest.getRecipientId(),
                chatDemoRequest.getSenderId(),
                chatDemoRequest.getImage(),
                chatDemoRequest.getText()
        );
        messagingTemplate.convertAndSendToUser(
                String.valueOf(chatDemoRequest.getRecipientId()),
                "/queue/messages",
                chatDemoDto
        );
        messagingTemplate.convertAndSendToUser(
                String.valueOf(senderId),
                "/queue/messages",
                chatDemoDto
        );
    }
}
