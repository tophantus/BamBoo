package com.shogun.Bamboo.controllers;

import com.shogun.Bamboo.dtos.ChatMessageDto;
import com.shogun.Bamboo.dtos.ChatMessageRequest;
import com.shogun.Bamboo.entities.ChatMessage;
import com.shogun.Bamboo.repositories.ChatMessageRepository;
import com.shogun.Bamboo.services.ChatMessageService;
import com.shogun.Bamboo.services.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    @PostMapping("/private/send")
    public ResponseEntity<ChatMessageDto> sendPrivateMessage(@RequestBody ChatMessageRequest chatMessageRequest) {
        ChatMessageDto chatMessageDto = chatMessageService.sendPrivateMessage(
                chatMessageRequest.getRecipientId(),
                chatMessageRequest.getSenderId(),
                chatMessageRequest.getText(),
                chatMessageRequest.getImage()
        );
        return new ResponseEntity<>(chatMessageDto, HttpStatus.OK);
    }

    @PostMapping("/group/send")
    public ResponseEntity<ChatMessageDto> sendGroupMessage(@RequestBody ChatMessageRequest chatMessageRequest) {
        try {
            ChatMessageDto chatMessageDto = chatMessageService.sendGroupMessage(
                    chatMessageRequest.getRoomId(),
                    chatMessageRequest.getSenderId(),
                    chatMessageRequest.getText(),
                    chatMessageRequest.getImage()
            );
            return new ResponseEntity<>(chatMessageDto, HttpStatus.OK);
        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
