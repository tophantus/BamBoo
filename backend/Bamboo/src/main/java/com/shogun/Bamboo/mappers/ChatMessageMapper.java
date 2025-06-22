package com.shogun.Bamboo.mappers;

import com.shogun.Bamboo.dtos.ChatMessageDto;
import com.shogun.Bamboo.entities.ChatDemo;
import com.shogun.Bamboo.entities.ChatMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatMessageMapper {
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    @Mapping(source = "sender.id", target = "senderId")
    @Mapping(source = "room.id", target = "roomId")
    ChatMessageDto toDto(ChatMessage chatMessage);
    List<ChatMessageDto> toDtoList(List<ChatMessage> chatMessageList);
}
