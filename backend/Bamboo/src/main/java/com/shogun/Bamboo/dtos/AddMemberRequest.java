package com.shogun.Bamboo.dtos;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddMemberRequest {
    private UUID requesterId;
    private UUID userId;
}
