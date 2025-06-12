package com.shogun.Bamboo.auth.services;

import com.shogun.Bamboo.auth.dtos.RegistrationRequest;
import com.shogun.Bamboo.auth.dtos.RegistrationResponse;
import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.helpers.VerificationCodeGenerator;
import com.shogun.Bamboo.auth.mappers.UserMapper;
import com.shogun.Bamboo.auth.repositories.UserDetailsRepository;
import com.shogun.Bamboo.exceptions.ResourcesNotFoundEx;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ServerErrorException;

@Service
@AllArgsConstructor
public class RegistrationService {
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;
    private UserDetailsRepository userDetailsRepository;
    private AuthorityService authorityService;
    private MailService mailService;

    public RegistrationResponse createUser(RegistrationRequest request) {
        User existing = userDetailsRepository.findByEmail(request.getEmail()).orElse(null);

        if (existing != null) {
            return RegistrationResponse.builder()
                    .code(400)
                    .message("Email already exist")
                    .build();
        }

        try {
            User user = userMapper.toUser(request);
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEnabled(false);
            user.setProvider("manual");

            String code = VerificationCodeGenerator.generateCode();
            user.setVerificationCode(code);
            user.setAuthorities(authorityService.getUserAuthority());
            userDetailsRepository.save(user);

            //send email
            mailService.sendMail(user);

            return RegistrationResponse.builder()
                    .code(200)
                    .message("User created")
                    .build();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ServerErrorException(e.getMessage(), e.getCause());
        }
    }

    @Transactional
    public void deleteUser(String username) {
        userDetailsRepository.deleteByEmail(username);
    }

    public void verifyUser(String username) {
        User user = userDetailsRepository.findByEmail(username)
                .orElseThrow(() -> new ResourcesNotFoundEx("User not found with email: " + username));
        user.setEnabled(true);
        userDetailsRepository.save(user);
    }
}
