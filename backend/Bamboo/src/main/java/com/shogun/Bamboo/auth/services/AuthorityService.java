package com.shogun.Bamboo.auth.services;

import com.shogun.Bamboo.auth.entities.Authority;
import com.shogun.Bamboo.auth.repositories.AuthorityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AuthorityService {
    private AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthority() {
        List<Authority> authorities = new ArrayList<>();
        Authority authority = authorityRepository.findByRoleCode("USER");
        authorities.add(authority);
        return  authorities;
    }

    public Authority createAuthority(String role, String description) {
        Authority authority = Authority.builder()
                .roleCode(role)
                .roleDescription(description)
                .build();
        return authorityRepository.save(authority);
    }
}
