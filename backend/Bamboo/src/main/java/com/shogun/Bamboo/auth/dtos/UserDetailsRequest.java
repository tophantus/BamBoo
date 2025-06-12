package com.shogun.Bamboo.auth.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetailsRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
