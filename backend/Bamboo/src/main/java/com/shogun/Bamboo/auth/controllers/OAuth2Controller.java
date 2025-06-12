package com.shogun.Bamboo.auth.controllers;

import com.shogun.Bamboo.auth.config.JwtTokenHelper;
import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.services.OAuth2Service;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/oauth2")
@CrossOrigin
public class OAuth2Controller {
    private final OAuth2Service oAuth2Service;
    private final JwtTokenHelper jwtTokenHelper;

    public OAuth2Controller(OAuth2Service oAuth2Service, JwtTokenHelper jwtTokenHelper) {
        this.oAuth2Service = oAuth2Service;
        this.jwtTokenHelper = jwtTokenHelper;
    }

    @GetMapping("/success")
    public void callbackOAuth2(@AuthenticationPrincipal OAuth2User oAuth2User, HttpServletResponse response) throws IOException {
        String username = oAuth2User.getAttribute("email");
        User user = oAuth2Service.getUser(username);
        if (user == null) {
            user = oAuth2Service.createUser(oAuth2User, "google");
        }

        String token = jwtTokenHelper.generateToken(user.getUsername(), user.getId());

        String redirectUrl = "http://localhost:5173/oauth2/callback?token=" + token;

        response.sendRedirect(redirectUrl);
    }
}
