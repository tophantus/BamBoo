package com.shogun.Bamboo.services;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.services.CustomUserDetailsService;
import com.shogun.Bamboo.entities.ChatMessage;
import com.shogun.Bamboo.entities.ChatRoom;
import com.shogun.Bamboo.exceptions.ResourcesNotFoundEx;
import com.shogun.Bamboo.repositories.ChatMessageRepository;
import com.shogun.Bamboo.repositories.ChatRoomMemberRepository;
import com.shogun.Bamboo.repositories.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final CustomUserDetailsService userDetailsService;
    private final ChatRoomService chatRoomService;

    public List<ChatMessage> getMessagesByRoomId(UUID roomId) {
        return chatMessageRepository.findAllByRoomId(roomId);
    }

    public ChatMessage sendPrivateMessage(UUID recipientId, UUID senderId, String text, String image) {
        User sender = userDetailsService.findByIdWithAuthorities(senderId)
                .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + senderId + " not found"));
        User recipient = userDetailsService.findByIdWithAuthorities(recipientId)
                .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + recipientId + " not found"));
        ChatRoom room = chatRoomRepository
                .findPrivateRoomBetweenUsers(senderId, recipientId)
                .orElseGet(() -> chatRoomService.createPrivateRoom(sender, recipient));

        return saveMessage(room, sender, text, image);
    }

    public ChatMessage sendGroupMessage(UUID roomId, UUID senderId, String text, String image) throws AccessDeniedException {
        User sender = userDetailsService.findByIdWithAuthorities(senderId)
                .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + senderId + " not found"));
        ChatRoom chatRoom = chatRoomRepository.findWithMembersById(roomId)
                .orElseThrow(() -> new ResourcesNotFoundEx("Room with id " + roomId + " not found"));
        boolean isMember = chatRoomMemberRepository.existsByRoomIdAndUserId(roomId, senderId);
        if (!isMember) {
            throw new AccessDeniedException("You are not a member of this room");
        }
        return saveMessage(chatRoom, sender, text, image);
    }

    private ChatMessage saveMessage(ChatRoom room, User sender, String text, String image) {
        ChatMessage chatMessage = ChatMessage.builder()
                .room(room)
                .sender(sender)
                .text(text)
                .image(image)
                .build();
        return chatMessageRepository.save(chatMessage);
    }
}
