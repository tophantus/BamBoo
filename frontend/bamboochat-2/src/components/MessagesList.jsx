import React, { useEffect, useRef } from 'react'
import { formatMessageTime } from '../utils/utils'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const MessagesList = () => {
    const {
        messages,
        selectedUser,
        getMessages,
    } = useChatStore();
    const {authUser} = useAuthStore();

    useEffect(() => {
        if (selectedUser?.id) {
          getMessages(selectedUser.id);
        }
    }, [selectedUser?.id, getMessages])

    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`chat ${message?.sender?.id === authUser?.id ? "chat-end" : "chat-start"}`}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message?.sender?.id === authUser?.id
                      ? authUser?.profilePic || "/avatar.jpg"
                      : selectedUser?.profilePic || "/avatar.jpg"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1 text-black">
                {formatMessageTime(message?.createdDate)}
              </time>
            </div>
            <div className={`chat-bubble flex flex-col ${message?.sender?.id === authUser?.id ? "bg-milk text-black" : "bg-bamboo text-milk"}`}>
              {message?.image && (
                <img
                  src={message?.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message?.text && <p>{message?.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
  )
}

export default MessagesList