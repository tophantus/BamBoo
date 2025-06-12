package com.shogun.Bamboo.cloudinary.controller;


import com.shogun.Bamboo.cloudinary.service.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class UploadController {
    private final CloudinaryService cloudinaryService;

    public UploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam(name = "file")MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "File is missing or empty"));
        }

        try {
            String imageUrl = cloudinaryService.uploadFile(file);
            return new ResponseEntity<>(Map.of("url", imageUrl), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Upload failed", "details", e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeImage(@RequestParam(name = "url") String url) {
        cloudinaryService.deleteImage(url);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
