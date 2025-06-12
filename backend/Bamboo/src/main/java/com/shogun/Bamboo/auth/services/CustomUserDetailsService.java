package com.shogun.Bamboo.auth.services;

import com.shogun.Bamboo.auth.dtos.UserDetailsDto;
import com.shogun.Bamboo.auth.dtos.UserDetailsRequest;
import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.entities.UserStatus;
import com.shogun.Bamboo.auth.mappers.UserMapper;
import com.shogun.Bamboo.auth.repositories.UserDetailsRepository;
import com.shogun.Bamboo.cloudinary.service.CloudinaryService;
import com.shogun.Bamboo.exceptions.ResourcesNotFoundEx;
import lombok.RequiredArgsConstructor;
import org.mapstruct.control.MappingControl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
    private final UserDetailsRepository userDetailsRepository;
    private final UserMapper userMapper;
    private final CloudinaryService cloudinaryService;

    @Override
    public UserDetails loadUserByUsername(String username) {

        User user = userDetailsRepository.findByEmail(username)
                .orElseThrow(() -> new ResourcesNotFoundEx("User not found with email: " + username));
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username "+ username);
        }
        return user;
    }

    public Optional<User> findById(UUID id) {
        return userDetailsRepository.findById(id);
    }

    public Optional<User> findByIdWithAuthorities(UUID id) {
        return userDetailsRepository.findByIdWithAuthorities(id);
    }

    @Transactional(readOnly = true)
    public UserDetailsDto getUserDtoByUsername(String username) {
        User userWithAuthorities = userDetailsRepository.findByEmail(username)
                .orElseThrow(() -> new ResourcesNotFoundEx("User not found with email: " + username));

        userDetailsRepository.findByEmail(username);
        return userMapper.toDto(userWithAuthorities);
    }

    public UserDetailsDto updateUserProfile(UserDetailsRequest userDetailsRequest, User user, MultipartFile file) {
        userMapper.updateEntityFromRequest(userDetailsRequest, user);
        if (null != file && !file.isEmpty()) {
            if (null != user.getProfilePic()) {
                cloudinaryService.deleteImage(user.getProfilePic());
            }
            String url = cloudinaryService.uploadFile(file);
            user.setProfilePic(url);
        }
        User savedUser = userDetailsRepository.save(user);
        return userMapper.toDto(savedUser);
    }

    public List<UserDetailsDto> getAllUser(UUID id) {
        return userMapper.toDtoList(userDetailsRepository.findByIdNot(id));
    }

    public UserDetailsDto toDto(User user) {
        return userMapper.toDto(user);
    }

    public UserDetailsDto connect(UserDetailsDto userDetailsDto) {
        User user = userDetailsRepository.findById(userDetailsDto.getId())
                .orElseThrow(() -> new ResourcesNotFoundEx(""));
        user.setStatus(UserStatus.ONLINE);
        User savedUser = userDetailsRepository.save(user);
        return userMapper.toDto(savedUser);
    }

    public List<UserDetailsDto> getOnlineUser() {
        List<User> onlineUsers = userDetailsRepository.findByStatus(UserStatus.ONLINE);
        return userMapper.toDtoList(onlineUsers);
    }

    public UserDetailsDto disconnect(UUID id) {
        User user = userDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourcesNotFoundEx(""));
        user.setStatus(UserStatus.OFFLINE);
        return userMapper.toDto(userDetailsRepository.save(user));
    }
}
