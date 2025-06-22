package com.shogun.Bamboo.services;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.services.CustomUserDetailsService;
import com.shogun.Bamboo.dtos.PrivateChatInviteDto;
import com.shogun.Bamboo.entities.ChatRoom;
import com.shogun.Bamboo.entities.PrivateChatInvite;
import com.shogun.Bamboo.entities.PrivateChatInviteStatus;
import com.shogun.Bamboo.exceptions.ResourcesNotFoundEx;
import com.shogun.Bamboo.mappers.PrivateChatInviteMapper;
import com.shogun.Bamboo.repositories.ChatRoomRepository;
import com.shogun.Bamboo.repositories.PrivateChatInviteRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PrivateChatInviteService {
    private final PrivateChatInviteRepository privateChatInviteRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;
    private final CustomUserDetailsService userDetailsService;
    private final PrivateChatInviteMapper privateChatInviteMapper;


    public PrivateChatInviteDto sendChatInvite(UUID senderId, UUID recipientId) throws BadRequestException {
        ChatRoom chatRoom = chatRoomRepository.findPrivateRoomBetweenUsers(senderId, recipientId)
                .orElse(null);
        if (null != chatRoom) {
            throw new BadRequestException("Room already Exist");
        }
        if (senderId.equals(recipientId)) {
            throw new BadRequestException("Cannot Invite yourself");
        }
        List<PrivateChatInvite> privateChatInviteList = privateChatInviteRepository.findAllInviteBetweenSenderAndRecipient(senderId, recipientId);
        long rejectedCount = privateChatInviteList.stream().filter(
                privateChatInvite -> privateChatInvite.getStatus().equals(PrivateChatInviteStatus.REJECTED)
        ).count();
        boolean hasAccepted = privateChatInviteList.stream().anyMatch(
                privateChatInvite -> privateChatInvite.getStatus().equals(PrivateChatInviteStatus.ACCEPTED)
        );

        boolean hasPending = privateChatInviteList.stream().anyMatch(
                privateChatInvite -> privateChatInvite.getStatus().equals(PrivateChatInviteStatus.PENDING)
        );

        if (hasPending) {
            throw new BadRequestException("An Invite is already pending");
        }

        if (rejectedCount > 4) {
            throw new BadRequestException("You have been blocked due to too many rejections");
        }
        if (hasAccepted) {
            throw new BadRequestException("A chat room already Exist");
        }
        User sender = userDetailsService.findByIdWithAuthorities(senderId)
                .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + senderId + " not found"));
        User recipient = userDetailsService.findByIdWithAuthorities(recipientId)
                .orElseThrow(() -> new ResourcesNotFoundEx("User with id " + recipientId + " not found"));
        PrivateChatInvite privateChatInvite = PrivateChatInvite.builder()
                .sender(sender)
                .recipient(recipient)
                .status(PrivateChatInviteStatus.PENDING)
                .build();
        PrivateChatInvite savedInvite = privateChatInviteRepository.save(privateChatInvite);
        return privateChatInviteMapper.toDto(savedInvite);
    }

    public PrivateChatInviteDto acceptChatInvite(UUID inviteId, User user) throws BadRequestException {
        PrivateChatInvite privateChatInvite = privateChatInviteRepository.findWithRecipientAndSenderById(inviteId)
                .orElseThrow(() -> new ResourcesNotFoundEx("ChatInvite with id " + inviteId + " not found"));
        if (!user.getId().equals(privateChatInvite.getRecipient().getId())) {
            throw new BadRequestException("You are not the recipient if this invite");
        }
        if (!privateChatInvite.getStatus().equals(PrivateChatInviteStatus.PENDING)) {
            throw new BadRequestException("This invite has already been processed");
        }
        privateChatInvite.setStatus(PrivateChatInviteStatus.ACCEPTED);
        ChatRoom chatRoom = chatRoomService.createPrivateRoom(privateChatInvite.getSender(), privateChatInvite.getRecipient());
        PrivateChatInvite savedPrivateChatInvite = privateChatInviteRepository.save(privateChatInvite);
        return privateChatInviteMapper.toDto(savedPrivateChatInvite);
    }

    public PrivateChatInviteDto rejectChatInvite(UUID inviteId, User user) throws BadRequestException {
        PrivateChatInvite privateChatInvite = privateChatInviteRepository.findWithRecipientAndSenderById(inviteId)
                .orElseThrow(() -> new ResourcesNotFoundEx("ChatInvite with id " + inviteId + " not found"));
        if (!user.getId().equals(privateChatInvite.getRecipient().getId())) {
            throw new BadRequestException("You are not recipient");
        }
        privateChatInvite.setStatus(PrivateChatInviteStatus.REJECTED);
        PrivateChatInvite savedPrivateChatInvite = privateChatInviteRepository.save(privateChatInvite);
        return privateChatInviteMapper.toDto(savedPrivateChatInvite);
    }

    public List<PrivateChatInviteDto> getAllPendingInvite(UUID userId) {
        List<PrivateChatInvite> privateChatInviteList = privateChatInviteRepository.findAllPendingInvitesByRecipient(userId);
        return privateChatInviteMapper.toDtoList(privateChatInviteList);
    }
}
