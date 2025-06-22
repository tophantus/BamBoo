package com.shogun.Bamboo.mappers;

import com.shogun.Bamboo.dtos.ChatRoomDto;
import com.shogun.Bamboo.entities.ChatRoom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ChatRoomMemberMapper.class})
public interface ChatRoomMapper {
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    @Mapping(source = "privateChat", target = "privateChat")
    ChatRoomDto toDto(ChatRoom chatRoom);
    List<ChatRoomDto> toDtoList(List<ChatRoom> chatRoomList);
}
