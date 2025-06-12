import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Annoyed, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const SideBar = () => {
    const {getUsers, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
    const users = useChatStore((state) => state.users);
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    useEffect (() => {
        getUsers();
    }, [])


    const filteredUsers = showOnlineOnly
        ? users?.filter((user) => onlineUsers.some((onlineUser) => onlineUser.id === user.id))
        : users;


  return (
    <aside className="h-full w-20 lg:w-full lg:w-max-[300px] bg-bamboo flex flex-col rounded-[30px] transition-all duration-200">
      <div className="border-b border-base-100 border-oldBamboo w-full p-5">
        <div className="flex items-center gap-2 text-milk">
          <User className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer text-milk flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm bg-milk text-bamboo checked:bg-milk checked:text-bamboo"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-oldBamboo">({onlineUsers.length - 1 >= 0 ? onlineUsers.length - 1 : 0} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full h-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user?.id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-oldBamboo bg-opacity-80 transition-colors
              ${selectedUser?.id === user.id ? "bg-oldBamboo" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.lastName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.some((onlineUser) => onlineUser.id === user.id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className={`hidden lg:block text-left min-w-0 ${selectedUser?.id === user.id ? "text-bamboo" : "text-milk"}`}>
              <div className="font-medium truncate">{user.firstName +" "+ user.lastName}</div>
              <div className="text-sm">
                {onlineUsers.some((onlineUser) => onlineUser.id === user.id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
            <div className="flex flex-col w-full h-full items-center gap-2 text-milk py-6">
                <p>No online users</p>
                <div className='w-full h-full p-4 flex justify-center items-center'>
                    <div className='w-full h-full max-w-[200px] max-h-[200px] bg-paper rounded-[25px] text-bamboo flex justify-center items-center'>
                        <Annoyed className='h-16 w-16 animate-bounce'/>
                    </div>
                </div>
            </div>
        )}
      </div>
    </aside>
  )
}

export default SideBar