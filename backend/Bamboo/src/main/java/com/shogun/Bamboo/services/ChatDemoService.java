package com.shogun.Bamboo.services;


import com.shogun.Bamboo.auth.entities.User;
import com.shogun.Bamboo.auth.services.CustomUserDetailsService;
import com.shogun.Bamboo.cloudinary.service.CloudinaryService;
import com.shogun.Bamboo.dtos.ChatDemoDto;
import com.shogun.Bamboo.entities.ChatDemo;
import com.shogun.Bamboo.mappers.ChatDemoMapper;
import com.shogun.Bamboo.repositories.ChatDemoRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatDemoService {
    private final ChatDemoRepository chatDemoRepository;
    private final ChatDemoMapper chatDemoMapper;
    private final CustomUserDetailsService userDetailsService;
    private final CloudinaryService cloudinaryService;

    public List<ChatDemoDto> getChatMessageWithOtherUser(UUID id, UUID userId) {
        List<ChatDemo> chatDemos = chatDemoRepository.findMessagesBetweenUsers(id, userId);
        return chatDemoMapper.toDtoList(chatDemos);
    }

    public ChatDemoDto saveChatToDb(UUID recipientId, UUID senderId, String image, String text) {
        if (senderId.equals(recipientId)) {
            throw new IllegalArgumentException("Không thể gửi tin nhắn cho chính mình");
        }
        try {
            User user = userDetailsService.findByIdWithAuthorities(senderId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người gửi"));
            User recipient = userDetailsService.findByIdWithAuthorities(recipientId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người nhận"));

            ChatDemo chatDemo = createChat(user, recipient, image, text);
            return chatDemoMapper.toDto(chatDemo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    private ChatDemo createChat(User user, User recipient, String image, String text) {
        ChatDemo chatDemo = ChatDemo.builder()
                .sender(user)
                .recipient(recipient)
                .build();
        if (image != null && !image.isEmpty()) {
            chatDemo.setImage(image);
        }
        if (text != null && !text.isBlank()) {
            chatDemo.setText(text);
        }
        chatDemoRepository.save(chatDemo);
        return chatDemo;
    }

//        public ChatDemoDto sendMessageToUser(UUID id, User user, MultipartFile file, String text) {
//        try {
//            if (null == user) {
//                throw new Exception("");
//            }
//            User recipient = userDetailsService.findById(id)
//                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người nhận"));
//            if (null != recipient) {
//                ChatDemo chatDemo = createChat(user, recipient, file, text);
//                return chatDemoMapper.toDto(chatDemo);
//            }
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//        return null;
//
//    }

//    private ChatDemo createChat(User user, User recipient, MultipartFile file, String text) {
//        ChatDemo chatDemo = ChatDemo.builder()
//                .sender(user)
//                .recipient(recipient)
//                .build();
//        if (file != null && !file.isEmpty()) {
//            String url = cloudinaryService.uploadFile(file);
//            chatDemo.setImage(url);
//        }
//        if (text != null && !text.isBlank()) {
//            chatDemo.setText(text);
//        }
//        chatDemoRepository.save(chatDemo);
//        return chatDemo;
//    }
}
