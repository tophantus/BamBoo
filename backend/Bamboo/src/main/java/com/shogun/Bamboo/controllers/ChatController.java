package com.shogun.Bamboo.controllers;

import com.shogun.Bamboo.auth.dtos.UserDetailsRequest;
import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.cloudinary.service.CloudinaryService;
import com.shogun.Bamboo.dtos.ChatDemoDto;
import com.shogun.Bamboo.dtos.ChatDemoRequest;
import com.shogun.Bamboo.entities.ChatDemo;
import com.shogun.Bamboo.entities.ChatMessage;
import com.shogun.Bamboo.services.ChatDemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class ChatController {
    private final ChatDemoService chatDemoService;
    private final CloudinaryService cloudinaryService;

    @GetMapping("/{id}")
    public ResponseEntity<List<ChatDemoDto>> getChatMessageWithOtherUser(
            @PathVariable(name = "id") UUID id,
            @AuthenticationPrincipal User user
    ) {
        List<ChatDemoDto> chatDemos = chatDemoService.getChatMessageWithOtherUser(id, user.getId());
        return new ResponseEntity<>(chatDemos, HttpStatus.OK);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestPart("image") MultipartFile file) {
        // Lưu file, trả về URL ảnh
        String imageUrl = cloudinaryService.uploadFile(file);
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }

//    @PostMapping("/send/{id}")
//    public ResponseEntity<?> sendMessageToUser(
//            @PathVariable(name = "id") UUID id,
//            @AuthenticationPrincipal User user,
//            @RequestPart(value = "image", required = false) MultipartFile file,
//            @RequestPart(value = "text", required = false) String text
//    ) {
//        if ((null == file || file.isEmpty()) && (null == text || text.isBlank())) {
//            System.out.println("empty");
//            return new ResponseEntity<>("Vui lòng cung cấp nội dung hoặc ảnh",HttpStatus.BAD_REQUEST);
//        }
//        ChatDemoDto chatDemoDto = chatDemoService.sendMessageToUser(id, user, file, text);
//        return new ResponseEntity<>(chatDemoDto, HttpStatus.CREATED);
//    }

}
