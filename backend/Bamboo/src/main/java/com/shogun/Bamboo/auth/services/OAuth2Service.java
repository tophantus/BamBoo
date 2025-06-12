package com.shogun.Bamboo.auth.services;

import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.repositories.UserDetailsRepository;
import com.shogun.Bamboo.exceptions.ResourcesNotFoundEx;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuth2Service {
    private final UserDetailsRepository userDetailsRepository;
    private final AuthorityService authorityService;

    public OAuth2Service(UserDetailsRepository userDetailsRepository, AuthorityService authorityService) {
        this.userDetailsRepository = userDetailsRepository;
        this.authorityService = authorityService;
    }

    public User getUser(String username) {
        return userDetailsRepository.findByEmail(username)
                .orElseThrow(() -> new ResourcesNotFoundEx("User not found with email: " + username));
    }

    public User createUser(OAuth2User oAuth2User, String provider) {
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String email = oAuth2User.getAttribute("email");
        User user = User.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .provider(provider)
                .enabled(true)
                .authorities(authorityService.getUserAuthority())
                .build();
        return userDetailsRepository.save(user);
    }
}
