package com.shogun.Bamboo.auth.controllers;

import com.shogun.Bamboo.auth.config.JwtTokenHelper;
import com.shogun.Bamboo.auth.dtos.*;
import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.services.CustomUserDetailsService;
import com.shogun.Bamboo.auth.services.RegistrationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.boot.web.server.Cookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private AuthenticationManager authenticationManager;
    private RegistrationService registrationService;
    private UserDetailsService userDetailsService;
    private CustomUserDetailsService customUserDetailsService;
    private JwtTokenHelper jwtTokenHelper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
            );

            Authentication authenticationResponse = this.authenticationManager.authenticate(authentication);

            if (authenticationResponse.isAuthenticated()) {
                User user = (User) authenticationResponse.getPrincipal();
                if (!user.isEnabled()) {
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }

                String token = jwtTokenHelper.generateToken(user.getEmail(), user.getId());
                ResponseCookie cookie = ResponseCookie.from("jwt_token", token)
                        .httpOnly(true)
                        .secure(false)
                        .path("/")
                        .maxAge(3600)
                        .sameSite(String.valueOf(Cookie.SameSite.STRICT))
                        .build();
                response.addHeader("Set-Cookie", cookie.toString());
                UserDetailsDto userDetailsDto = customUserDetailsService.toDto(user);
                return new ResponseEntity<>(userDetailsDto, HttpStatus.OK);
            }
        } catch (BadCredentialsException | DisabledException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt_token")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite(String.valueOf(Cookie.SameSite.STRICT))
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        RegistrationResponse response = registrationService.createUser(request);
        if (response.getCode() == 200) {
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(Map.of("message", "User already exists"), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> map) {
        String username = map.get("username");
        String code = map.get("code");

        User user = (User) userDetailsService.loadUserByUsername(username);

        if (user != null && user.getVerificationCode().equals(code)) {
            registrationService.verifyUser(username);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return  ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "Invalid verification code"));
    }

    @PostMapping("/delete/{username}")
    public ResponseEntity<Void> delete(@PathVariable("username")String username) {
        registrationService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
