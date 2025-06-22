package com.shogun.Bamboo.mappers;

import com.shogun.Bamboo.auth.mappers.UserMapper;
import com.shogun.Bamboo.dtos.PrivateChatInviteDto;
import com.shogun.Bamboo.entities.PrivateChatInvite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface PrivateChatInviteMapper {
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    @Mapping(source = "sender", target = "sender")
    @Mapping(source = "recipient", target = "recipient")
    PrivateChatInviteDto toDto(PrivateChatInvite privateChatInvite);
    List<PrivateChatInviteDto> toDtoList(List<PrivateChatInvite> privateChatInviteList);
}
