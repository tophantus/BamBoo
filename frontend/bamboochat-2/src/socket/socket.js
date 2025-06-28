import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";
import { WEBSOCKET_URL } from "../api/constant";
import { useChatStore } from "../store/useChatStore";

let stompClient = null;

export const connectWebSocket = (user, onActiveUsersUpdate, onInvitesUpdate) => {

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

      console.log("Subscribing to /user/queue/messages");
      stompClient.subscribe("/user/queue/messages", (message) => {
        const privateMessage = JSON.parse(message.body);
        console.log("Connected to private")
        console.log("Private message received:", privateMessage);
        addMessage(privateMessage)
      });

      stompClient.subscribe("/user/queue/group", (message) => {
        const groupMessage = JSON.parse(message.body);
        console.log("connect to group")
        console.log("groupMessage received: ", groupMessage);
        addMessage(groupMessage)
      });

      stompClient.subscribe("/user/queue/invites", (message) => {
        const invite = JSON.parse(message.body);
        console.log("invite received", invite);
        onInvitesUpdate(invite);
      })

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

export const sendGroupMessage = (message) => {
  if (!stompClient || !stompClient.connected) return;

  stompClient.publish({
    destination: "/app/chat/group",
    body: JSON.stringify(message)
  });
}

export const sendInvite = (invite) => {
  if (!stompClient || !stompClient.connected) return;

  console.log("socketSend")
  stompClient.publish({
    destination: "/app/invite/send",
    body: JSON.stringify(invite)
  });
}

export const acceptInvite = (request) => {
  if (!stompClient || !stompClient.connected) return;

  stompClient.publish({
    destination: "/app/invite/accept",
    body: JSON.stringify(request)
  });
}

export const rejectInvite = (request) => {
  if (!stompClient || !stompClient.connected) return;

  stompClient.publish({
    destination: "/app/invite/reject",
    body: JSON.stringify(request)
  });
}