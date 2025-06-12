# 🐼 Bamboo – Ứng dụng Chat Thời Gian Thực

## 🧾 Tổng quan

**Bamboo** là một ứng dụng chat thời gian thực hiện đại, cung cấp trải nghiệm nhắn tin mượt mà giữa người dùng.  
Backend được xây dựng bằng Spring Boot và WebSocket, frontend sử dụng React với Zustand để quản lý trạng thái.  
Người dùng có thể đăng ký, đăng nhập bảo mật với JWT, giao tiếp thời gian thực, chat text và gửi ảnh.  
🎯 Tập trung vào sự đơn giản, hiệu năng và khả năng mở rộng.

---

## ✨ Tính năng

- 🔄 Chat thời gian thực sử dụng WebSocket (STOMP + SockJS)  
- 🔐 Xác thực người dùng với Spring Security + JWT (cookie-based)  
- 🧑‍🤝‍🧑 Hiển thị và theo dõi danh sách người dùng đang online  
- 📩 Hỗ trợ gửi tin nhắn riêng giữa hai người dùng (private chat)  
- 🖼️ Tích hợp Cloudinary để tải và lưu trữ ảnh người dùng / hình ảnh trong tin nhắn  
- 📥 API RESTful cho xác thực, lấy thông tin người dùng  
- 💻 Giao diện React hiện đại, responsive, sử dụng Zustand để quản lý state  

---

## 🧰 Công nghệ sử dụng

| 🧩 Thành phần        | 🚀 Công nghệ & Công cụ                                    |
|----------------------|-----------------------------------------------------------|
| 🔧 Backend           | Java, Spring Boot, Spring Security, WebSocket, JWT     |
| 🎨 Frontend          | React, Vite, Zustand, Axios, Tailwind CSS                 |
| 🛢️ Cơ sở dữ liệu     | PostgreSQL                                                |
| 🔐 Xác thực          | JWT, Spring Security                                      |
| 📡 Giao tiếp real-time| WebSocket, STOMP, SockJS                                 |
| ☁️ Lưu trữ ảnh       | Cloudinary                                                |

---

## 🗂️ Cấu trúc Dự án

```
Shogun/
├── backend/     # Spring Boot backend source code
├── frontend/    # React frontend source code
└── README.md    # Project documentation
```

---


## 📌 Lộ trình phát triển

- [x] Xác thực JWT + đăng nhập  
- [x] WebSocket chat real-time  
- [x] Danh sách người online  
- [x] Lưu ảnh bằng Cloudinary
- [x] Chat text và gửi ảnh
- [ ] Chat nhóm (Group Chat)
- [ ] Gửi icon, sticker  
- [ ] Gửi file đa phương tiện (video)  
- [ ] Notification tin nhắn mới (thông báo real-time)  
- [ ] Xem lịch sử chat (chat history / pagination)  
- [ ] Giao diện dark/light mode  
- [ ] Giao diện responsive cho mobile/tablet

---

## 🤝 Đóng góp

Dự án này là sản phẩm cá nhân. Bạn có thể thoải mái tạo issue hoặc gửi pull request nếu muốn đóng góp.
