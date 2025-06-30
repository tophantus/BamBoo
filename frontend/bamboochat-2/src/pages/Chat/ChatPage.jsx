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
  const {selectedUser, selectedRoom} = useChatStore();
  return (
    <div className='flex w-full bg-milk h-full gap-[10px] p-[10px] overflow-hidden'>
        <div className='flex flex-col items-center gap-[10px] bg-milk h-full lg:w-[35%] rounded-[10px]'>
            <SideBar/>
        </div>
        <div className='flex flex-col items-center bg-paper h-full w-full lg:w-[65%] rounded-[10px] overflow-hidden p-3'>
          {!selectedRoom ? <NoChatSelected /> : <ChatContainer />}
        </div>
    </div>
  )
}

export default ChatPage