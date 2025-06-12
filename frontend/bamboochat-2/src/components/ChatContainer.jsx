import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';


const ChatContainer = () => {
  return (
    <div className="flex-1 w-full flex flex-col overflow-auto ">
        <ChatHeader/>
        <MessagesList/>
        <MessageInput/>
    </div>
  )
}

export default ChatContainer