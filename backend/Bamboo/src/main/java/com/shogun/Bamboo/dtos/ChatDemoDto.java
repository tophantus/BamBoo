package com.shogun.Bamboo.dtos;

import com.shogun.Bamboo.auth.dtos.UserDetailsDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatDemoDto {
    private UUID id;
    private String text;
    private String image;
    private UserDetailsDto sender;
    private UserDetailsDto recipient;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
