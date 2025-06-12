package com.shogun.Bamboo.auth.mappers;

import com.shogun.Bamboo.auth.dtos.RegistrationRequest;
import com.shogun.Bamboo.auth.dtos.UserDetailsDto;
import com.shogun.Bamboo.auth.dtos.UserDetailsRequest;
import com.shogun.Bamboo.auth.entities.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",  uses = {AuthorityMapper.class})
public interface UserMapper {
    @Mapping(target = "password", ignore = true)
    User toUser(RegistrationRequest request);

    @Mapping(source = "authorityList", target = "authorities")
    UserDetailsDto toDto(User user);

    List<UserDetailsDto> toDtoList(List<User> users);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "authorities", ignore = true)
    void updateEntityFromRequest(UserDetailsRequest userDetailsRequest, @MappingTarget User user);
}
