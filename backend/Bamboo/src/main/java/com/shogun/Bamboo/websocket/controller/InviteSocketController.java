package com.shogun.Bamboo.websocket.controller;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.dtos.InviteActionRequest;
import com.shogun.Bamboo.dtos.InviteRequest;
import com.shogun.Bamboo.dtos.PrivateChatInviteDto;
import com.shogun.Bamboo.services.PrivateChatInviteService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class InviteSocketController {

    private final PrivateChatInviteService inviteService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Gửi lời mời chat qua socket
     */
    @MessageMapping("/invite/send")
    public void sendInvite(@Payload InviteRequest inviteRequest, Principal principal) throws BadRequestException {
        UUID senderId = UUID.fromString(principal.getName());
        PrivateChatInviteDto dto = inviteService.sendChatInvite(senderId, inviteRequest.getRecipientId());

        // Gửi cho recipient
        messagingTemplate.convertAndSendToUser(
                inviteRequest.getRecipientId().toString(),
                "/queue/invites",
                dto
        );

        // Gửi lại cho sender để confirm
        messagingTemplate.convertAndSendToUser(
                senderId.toString(),
                "/queue/invites",
                dto
        );
    }

    /**
     * Chấp nhận lời mời qua socket
     */
    @MessageMapping("/invite/accept")
    public void acceptInvite(@Payload InviteActionRequest request, Principal principal) throws BadRequestException {
        User user = new User();
        user.setId(UUID.fromString(principal.getName()));

        PrivateChatInviteDto dto = inviteService.acceptChatInvite(request.getInviteId(), user);

        // Gửi cho cả sender và recipient
        messagingTemplate.convertAndSendToUser(
                dto.getSender().getId().toString(),
                "/queue/invites",
                dto
        );
        messagingTemplate.convertAndSendToUser(
                dto.getRecipient().getId().toString(),
                "/queue/invites",
                dto
        );
    }

    /**
     * Từ chối lời mời qua socket
     */
    @MessageMapping("/invite/reject")
    public void rejectInvite(@Payload InviteActionRequest request, Principal principal) throws BadRequestException {
        User user = new User();
        user.setId(UUID.fromString(principal.getName()));

        PrivateChatInviteDto dto = inviteService.rejectChatInvite(request.getInviteId(), user);

        messagingTemplate.convertAndSendToUser(
                dto.getSender().getId().toString(),
                "/queue/invites",
                dto
        );

        // Gửi cho recipient để confirm
        messagingTemplate.convertAndSendToUser(
                dto.getRecipient().getId().toString(),
                "/queue/invites",
                dto
        );
    }
}
