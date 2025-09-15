package com.shogun.Bamboo.controllers;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.dtos.*;
import com.shogun.Bamboo.services.ChatRoomService;
import com.shogun.Bamboo.services.PrivateChatInviteService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final PrivateChatInviteService privateChatInviteService;

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<ChatMessageDto>> getAllMessageByRoomId(@PathVariable(name = "roomId") UUID roomId) {
        List<ChatMessageDto> chatMessageDtoList = chatRoomService.getMessagesByRoomId(roomId);
        return new ResponseEntity<>(chatMessageDtoList, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChatRoomDto>> getAllRoomByUserId(@PathVariable(name = "userId") UUID userId) {
        List<ChatRoomDto> chatRoomDtoList = chatRoomService.getAllRoomsForUser(userId);
        return new ResponseEntity<>(chatRoomDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> removeChatRoom(
            @PathVariable(name = "roomId") UUID roomId,
            @AuthenticationPrincipal User user
    ) {
        try {
            chatRoomService.removeChatRoom(roomId, user.getId());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/group")
    public ResponseEntity<ChatRoomDto> createChatRoom(@RequestBody ChatRoomRequest chatRoomRequest) {
        try {
            ChatRoomDto chatRoomDto = chatRoomService.createGroupChat(
                    chatRoomRequest.getName(),
                    chatRoomRequest.getCreatorId(),
                    chatRoomRequest.getMemberIds()
            );
            return new ResponseEntity<>(chatRoomDto, HttpStatus.CREATED);
        } catch (BadRequestException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/private/invite")
    public ResponseEntity<?> sendPrivateChatInvite(
            @RequestBody PrivateChatInviteRequest privateChatInviteRequest,
            @AuthenticationPrincipal User user
    ) {
        try {
            privateChatInviteRequest.setSenderId(user.getId());
            PrivateChatInviteDto privateChatInviteDto = privateChatInviteService.sendChatInvite(
                    privateChatInviteRequest.getSenderId(),
                    privateChatInviteRequest.getRecipientId()
            );
            return new ResponseEntity<>(privateChatInviteDto, HttpStatus.OK);
        } catch (BadRequestException e) {
            return new ResponseEntity<>(e.getMessage() ,HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/private/invite/{inviteId}/accept")
    public ResponseEntity<?> acceptPrivateChatInvite(
            @PathVariable(name = "inviteId") UUID inviteId,
            @AuthenticationPrincipal User user
    ) {
        try {
            PrivateChatInviteDto privateChatInviteDto = privateChatInviteService.acceptChatInvite(
                    inviteId,
                    user
            );
            return new ResponseEntity<>(privateChatInviteDto, HttpStatus.OK);
        } catch (BadRequestException e) {
            return new ResponseEntity<>(e.getMessage() ,HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/private/invite/{inviteId}/reject")
    public ResponseEntity<?> rejectPrivateChatInvite(
            @PathVariable(name = "inviteId") UUID inviteId,
            @AuthenticationPrincipal User user
    ) {
        try {
            PrivateChatInviteDto privateChatInviteDto = privateChatInviteService.rejectChatInvite(
                    inviteId,
                    user
            );
            return new ResponseEntity<>(privateChatInviteDto, HttpStatus.OK);
        } catch (BadRequestException e) {
            return new ResponseEntity<>(e.getMessage() ,HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/private/invite/{userId}")
    public ResponseEntity<?> getAllPendingInvite(@PathVariable(name = "userId") UUID userId) {
        List<PrivateChatInviteDto> privateChatInviteDto = privateChatInviteService.getAllPendingInvite(userId);
        System.out.println("privateChatInvite" + privateChatInviteDto);
        return new ResponseEntity<>(privateChatInviteDto, HttpStatus.OK);
    }

    @GetMapping("/private/invite/sent/{senderId}")
    public ResponseEntity<?> getAllPendingSentInvites(@PathVariable(name = "senderId") UUID senderId) {
        List<PrivateChatInviteDto> privateChatInviteDto =
                privateChatInviteService.getAllPendingSentInvites(senderId);
        return new ResponseEntity<>(privateChatInviteDto, HttpStatus.OK);
    }

    @PostMapping("/{roomId}/add-member")
    public ResponseEntity<?> addMember(
            @PathVariable(name = "roomId") UUID roomId,
            @RequestBody AddMemberRequest addMemberRequest
    ) {
        try {
            chatRoomService.addMemberToGroup(
                    roomId,
                    addMemberRequest.getRequesterId(),
                    addMemberRequest.getUserId()
            );
            return new ResponseEntity<>("Member added", HttpStatus.OK);
        } catch (AccessDeniedException | BadRequestException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{roomId}/add-admin")
    public ResponseEntity<?> addAdmin(
            @PathVariable(name = "roomId") UUID roomId,
            @RequestBody AddAdminRequest addAdminRequest
    ) {
        try {
            chatRoomService.addNewAdmin(
                    roomId,
                    addAdminRequest.getRequesterId(),
                    addAdminRequest.getUserId()
            );
            return new ResponseEntity<>("Admin added", HttpStatus.OK);
        } catch (AccessDeniedException | BadRequestException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
