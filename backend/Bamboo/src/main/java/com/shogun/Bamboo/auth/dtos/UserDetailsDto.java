package com.shogun.Bamboo.auth.dtos;

import com.shogun.Bamboo.auth.entities.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetailsDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String profilePic;
    private UserStatus status;
    private List<AuthorityDto> authorities;
}
