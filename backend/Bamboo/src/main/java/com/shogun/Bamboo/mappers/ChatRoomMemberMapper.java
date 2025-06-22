package com.shogun.Bamboo.mappers;

import com.shogun.Bamboo.auth.mappers.UserMapper;
import com.shogun.Bamboo.dtos.ChatRoomMemberDto;
import com.shogun.Bamboo.entities.ChatRoomMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ChatRoomMemberMapper {
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    @Mapping(source = "room.id", target = "roomId")
    @Mapping(source = "admin", target = "admin")
    ChatRoomMemberDto toDto(ChatRoomMember chatRoomMember);
    List<ChatRoomMemberDto> toDtoList(List<ChatRoomMember> chatRoomMemberList);
}
