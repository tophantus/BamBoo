package com.shogun.Bamboo.websocket.helper;

import com.shogun.Bamboo.auth.config.JwtTokenHelper;
import com.shogun.Bamboo.websocket.entities.StompPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
public class WebSocketAuthHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtTokenHelper jwtTokenHelper;
    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception
    {
        try {
            if (!(request instanceof ServletServerHttpRequest)) {
                return false;
            }
            var servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            String token = jwtTokenHelper.getToken(servletRequest);

            if (token == null) {
                return false;
            }
            UUID userId = jwtTokenHelper.getUserIdFromToken(token);
            if ( null == userId) {
                return false;
            }

            attributes.put("user", new StompPrincipal(userId.toString()));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
