package com.shogun.Bamboo.services;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.services.CustomUserDetailsService;
import com.shogun.Bamboo.dtos.ChatMessageDto;
import com.shogun.Bamboo.dtos.ChatRoomDto;
import com.shogun.Bamboo.entities.ChatMessage;
import com.shogun.Bamboo.entities.ChatRoom;
import com.shogun.Bamboo.entities.ChatRoomMember;
import com.shogun.Bamboo.exceptions.ResourcesNotFoundEx;
import com.shogun.Bamboo.mappers.ChatMessageMapper;
import com.shogun.Bamboo.mappers.ChatRoomMapper;
import com.shogun.Bamboo.repositories.ChatMessageRepository;
import com.shogun.Bamboo.repositories.ChatRoomMemberRepository;
import com.shogun.Bamboo.repositories.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final CustomUserDetailsService userDetailsService;
    private final ChatRoomMapper chatRoomMapper;
    private final ChatMessageMapper chatMessageMapper;


    public List<ChatRoomDto> getAllRoomsForUser(UUID userId) {
        List<ChatRoom> chatRooms = chatRoomRepository.findAllByUserId(userId);
        return chatRoomMapper.toDtoList(chatRooms);
    }

    public List<ChatMessageDto> getMessagesByRoomId(UUID roomId) {
        List<ChatMessage> chatMessages =  chatMessageRepository.findAllByRoomId(roomId);
        return chatMessageMapper.toDtoList(chatMessages);
    }

    public ChatRoomDto createGroupChat(String name, UUID creatorId, List<UUID> memberIds) throws BadRequestException {
        if (memberIds.size() < 2) {
            throw new BadRequestException("Cannot create group under 2 members");
        }
        User creator = userDetailsService.findByIdWithAuthorities(creatorId)
                .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + creatorId + " not found"));
        ChatRoom chatRoom = ChatRoom.builder()
                .name(name)
                .privateChat(false)
                .build();
        List<ChatRoomMember> members = new ArrayList<>();

        ChatRoomMember creatorMember = ChatRoomMember.builder()
                .room(chatRoom)
                .user(creator)
                .admin(true)
                .build();
        members.add(creatorMember);

        for (UUID userId : memberIds) {
            if (userId.equals(creatorId)) continue;

            User member = userDetailsService.findByIdWithAuthorities(userId)
                    .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + userId + " not found"));
            ChatRoomMember chatRoomMember = ChatRoomMember.builder()
                    .room(chatRoom)
                    .user(member)
                    .admin(false)
                    .build();
            members.add(chatRoomMember);
        }

        chatRoom.setMembers(members);

        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
        return chatRoomMapper.toDto(savedChatRoom);
    }

    public void addMemberToGroup(UUID roomId, UUID requesterId, UUID userId) throws AccessDeniedException, BadRequestException {
        ChatRoom room = chatRoomRepository.findWithMembersById(roomId)
                .orElseThrow(() -> new ResourcesNotFoundEx("Room with id " + roomId + " not found"));
        boolean isAdmin = chatRoomMemberRepository.existsByRoomIdAndUserIdAndAdminTrue(roomId, requesterId);
        if (!isAdmin) {
            throw new AccessDeniedException("Only admin can add members");
        }

        if (chatRoomMemberRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BadRequestException("User is already a member");
        }

        User newMember = userDetailsService.findById(userId)
                .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + userId + " not found"));

        ChatRoomMember chatRoomMember = ChatRoomMember.builder()
                .room(room)
                .admin(false)
                .user(newMember)
                .build();

        room.getMembers().add(chatRoomMember);
        chatRoomRepository.save(room);
    }

    public void addNewAdmin(UUID roomId, UUID requesterId, UUID userId) throws AccessDeniedException, BadRequestException {
        ChatRoom room = chatRoomRepository.findWithMembersById(roomId)
                .orElseThrow(() -> new ResourcesNotFoundEx("Room with id " + roomId + " not found"));
        boolean isAdmin = chatRoomMemberRepository.existsByRoomIdAndUserIdAndAdminTrue(roomId, requesterId);
        if (!isAdmin) {
            throw new AccessDeniedException("Only admin can add new Admin");
        }

        if (!chatRoomMemberRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BadRequestException("User is not a member");
        }
        if (chatRoomMemberRepository.existsByRoomIdAndUserIdAndAdminTrue(roomId, userId)) {
            throw new BadRequestException("User is already an admin");
        }

        ChatRoomMember chatRoomMember = room.getMembers().stream()
                .filter(member -> member.getUser().getId().equals(userId)).findFirst()
                .orElseThrow(() -> new BadRequestException("Member not found in room"));

        chatRoomMember.setAdmin(true);

        chatRoomRepository.save(room);
    }

    public ChatRoom createPrivateRoom(User sender, User recipient) {
        ChatRoom chatRoom = ChatRoom.builder()
                .name("PRIVATE CHAT")
                .privateChat(true)
                .build();
        ChatRoomMember chatRoomMemberA = ChatRoomMember.builder()
                .room(chatRoom)
                .user(sender)
                .admin(false)
                .build();
        ChatRoomMember chatRoomMemberB = ChatRoomMember.builder()
                .room(chatRoom)
                .user(recipient)
                .admin(false)
                .build();
        chatRoom.setMembers(List.of(chatRoomMemberA, chatRoomMemberB));

        return chatRoomRepository.save(chatRoom);
    }

    public void removeChatRoom(UUID roomId, UUID requesterId) throws AccessDeniedException {
//        boolean isAdmin = chatRoomMemberRepository.existsByRoomIdAndUserIdAndAdminTrue(roomId, requesterId);
//        if (!isAdmin) {
//            throw new AccessDeniedException("Only admin can delete this room");
//        }
        chatRoomRepository.deleteById(roomId);
    }
}
