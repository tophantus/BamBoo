import React, { useState } from 'react'
import data from '../../data/content.json'
import UserCard from '../../components/UserCard';
import {ChevronDown, ChevronRight} from "lucide-react";
import NavBar from '../../components/NavBar';
import UserList from '../../components/UserList';
import ChatBox from '../../components/ChatBox';
import NoChatSelected from '../../components/NoChatSelected';
import SideBar from '../../components/SideBar';
import ChatContainer from '../../components/ChatContainer';
import { useChatStore } from '../../store/useChatStore';

const ChatPage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='flex w-full bg-milk h-screen gap-[50px] p-[50px]'>
        <div className='flex flex-col items-center gap-[50px] bg-milk h-full w-[35%] rounded-[30px]'>
            <SideBar/>
        </div>
        <div className='flex flex-col items-center bg-paper h-full w-[65%] rounded-[30px] overflow-hidden p-3'>
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
    </div>
  )
}

export default ChatPage