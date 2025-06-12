package com.shogun.Bamboo.auth.dtos;

import lombok.Data;

@Data
public class AuthorityRequest {
    private String role;
    private String description;
}

