package com.shogun.Bamboo.dtos;

import lombok.Data;
import java.util.UUID;

@Data
public class InviteRequest {
    private UUID recipientId;
}

