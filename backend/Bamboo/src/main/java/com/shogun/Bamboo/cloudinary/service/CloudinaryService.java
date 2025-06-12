package com.shogun.Bamboo.cloudinary.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        System.out.println("cloudinary");
        this.cloudinary = cloudinary;
    }

    public String uploadFile(MultipartFile file) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            System.out.println("upload");
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Image upload failed");
        }
    }

    // Xoá ảnh khỏi Cloudinary
    public void deleteImage(String imageUrl) {
        try {
            // Lấy public ID từ URL của ảnh
            String publicId = extractPublicIdFromUrl(imageUrl);
            // Xóa ảnh khỏi Cloudinary
            Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            if ("ok".equals(result.get("result"))) {
                System.out.println("Image deleted successfully.");
            } else {
                System.out.println("Failed to delete image.");
            }
        } catch (IOException e) {
            throw new RuntimeException("Image deletion failed", e);
        }
    }

    private String extractPublicIdFromUrl(String imageUrl) {
        // URL của Cloudinary có dạng: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
        String[] parts = imageUrl.split("/v\\d+/");
        if (parts.length > 1) {
            String[] publicIdParts = parts[1].split("\\.");
            return publicIdParts[0]; // Public ID là phần trước dấu chấm (.)
        }
        throw new IllegalArgumentException("Invalid Cloudinary image URL");
    }
}
