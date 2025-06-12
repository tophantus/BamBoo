package com.shogun.Bamboo.mappers;

import com.shogun.Bamboo.auth.mappers.UserMapper;
import com.shogun.Bamboo.dtos.ChatDemoDto;
import com.shogun.Bamboo.entities.ChatDemo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ChatDemoMapper {
    @Mapping(source = "text", target = "text")
    @Mapping(source = "createdDate", target = "createdDate")
    ChatDemoDto toDto(ChatDemo chatDemo);
    List<ChatDemoDto> toDtoList(List<ChatDemo> chatDemos);
}
