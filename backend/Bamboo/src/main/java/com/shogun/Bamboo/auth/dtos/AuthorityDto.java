package com.shogun.Bamboo.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AuthorityDto {
    private UUID id;

    private String roleCode;

    private String roleDescription;
}
