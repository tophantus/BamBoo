package com.shogun.Bamboo.auth.mappers;

import com.shogun.Bamboo.auth.dtos.AuthorityDto;
import com.shogun.Bamboo.auth.entities.Authority;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AuthorityMapper {
    AuthorityDto toDto(Authority authority);

    List<AuthorityDto> toDtoList(List<Authority> authorities);
}
