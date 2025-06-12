import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";
import { WEBSOCKET_URL } from "../api/constant";
import { useChatStore } from "../store/useChatStore";

let stompClient = null;

export const connectWebSocket = (user, onActiveUsersUpdate) => {

  const { addMessage } = useChatStore.getState();

  console.log("Try connecting WebSocket", { stompClient, user });
  if (stompClient || !user) return;

  stompClient = new Client({
    webSocketFactory: () => new SockJS(WEBSOCKET_URL),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("WebSocket connected");

      stompClient.subscribe("/topic/active", (message) => {
        const users = JSON.parse(message.body);
        console.log(users);
        onActiveUsersUpdate(users);
      });

      stompClient.subscribe("/user/queue/messages", (message) => {
        const privateMessage = JSON.parse(message.body);
        console.log("Connected to private")
        console.log("Private message received:", privateMessage);
        addMessage(privateMessage)
      });

      stompClient.publish({
        destination: "/app/user/connect",
        body: JSON.stringify(user),
      });
    },
    onStompError: (frame) => {
      console.error("STOMP Error", frame.headers, frame.body);
    },
    onWebSocketClose: (event) => {
      console.warn("🔌 WebSocket closed", event);
    }
  });

  stompClient.activate();
};

export const disconnectWebSocket = (user) => {
  if (stompClient && user) {
    stompClient.publish({
      destination: "/app/user/disconnect",
      body: JSON.stringify(user),
    });

    stompClient.deactivate();
    stompClient = null;
    console.log("disconnect Socket");
  }
};

export const sendPrivateMessage = (message) => {
  if (!stompClient || !stompClient.connected) return;

  stompClient.publish({
    destination: "/app/chat/private",
    body: JSON.stringify(message)
  });
}