package com.shogun.Bamboo.auth.controllers;

import com.shogun.Bamboo.auth.dtos.UserDetailsDto;
import com.shogun.Bamboo.auth.dtos.UserDetailsRequest;
import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.services.CustomUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
@AllArgsConstructor
public class UserDetailsController {
    private final CustomUserDetailsService userDetailsService;

    @GetMapping("/profile")
    public ResponseEntity<UserDetailsDto> getUserProfile(Principal principal) {
        UserDetailsDto userDetailsDto =  userDetailsService.getUserDtoByUsername(principal.getName());
        if (userDetailsDto == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);
    }

    @PutMapping(value = "/update-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUserProfile(
            @RequestPart(value = "image", required = false) MultipartFile file,
            @RequestPart(value = "userinfo", required = false) UserDetailsRequest userDetailsRequest,
            @AuthenticationPrincipal User user) {
        if (null == userDetailsRequest || null == user) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        UserDetailsDto userDetailsDto = userDetailsService.updateUserProfile(userDetailsRequest, user, file);
        return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);
    }

    @GetMapping("/get-all-user")
    public ResponseEntity<?> getAllUser(@AuthenticationPrincipal User user) {
        if (null == user) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userDetailsService.getAllUser(user.getId()), HttpStatus.OK);
    }

    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuth(@AuthenticationPrincipal User user) {
        if (null == user) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        UserDetailsDto userDetailsDto = userDetailsService.toDto(user);
        return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);
    }
}
