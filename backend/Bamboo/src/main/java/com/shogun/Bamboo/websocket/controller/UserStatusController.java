package com.shogun.Bamboo.websocket.controller;

import com.shogun.Bamboo.auth.dtos.UserDetailsDto;
import com.shogun.Bamboo.auth.services.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserStatusController {
    private final CustomUserDetailsService userDetailsService;

    @MessageMapping("/user/connect")
    @SendTo("/topic/active")
    public List<UserDetailsDto> connect(@Payload UserDetailsDto userDetailsDto) {
        userDetailsService.connect(userDetailsDto);
        return userDetailsService.getOnlineUser();
    }


    @MessageMapping("/user/disconnect")
    @SendTo("/topic/active")
    public List<UserDetailsDto> disconnect(@Payload UserDetailsDto userDetailsDto) {
        userDetailsService.disconnect(userDetailsDto.getId());
        return userDetailsService.getOnlineUser();
    }}
