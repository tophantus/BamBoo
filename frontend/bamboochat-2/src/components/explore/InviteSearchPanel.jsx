import React, { useEffect, useState } from 'react'
import { useExploreStore } from '../../store/useExploreStore';
import { Users } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const InviteSearchPanel = () => {
  const {selectedUser, setSelectedUser, users, getUsers} = useExploreStore();
  const [activeTab, setActiveTab] = useState("INVITE");
   const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <aside className="h-full w-20 lg:w-full lg:w-max-[300px] bg-bamboo flex flex-col rounded-[30px] transition-all duration-200">
      <div className=" border-oldBamboo w-full p-5 overflow-hidden">
        <div className="flex items-center gap-2 text-milk">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Community</span>
        </div>
        <div className="flex">
          <button
            className={`flex-1 text-center py-2   text-milk ${
              activeTab === "INVITE"
                ? "border-b-2 border-milk font-bold text-milk"
                : "font-medium"
            }`}
            onClick={() => setActiveTab("INVITE")}
          >
            INVITE FRIENDS
          </button>
          <button
            className={`flex-1 text-center py-2  text-milk ${
              activeTab === "PENDING"
                ? "border-b-2 border-milk font-bold text-milk"
                : "font-medium"
            }`}
            onClick={() => setActiveTab("PENDING")}
          >
            PENDING INVITES
          </button>
        </div>
      </div>

      <div className="overflow-y-auto w-full h-full py-3">
        {users.map((user) => (
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

            <div className={`hidden lg:block text-left min-w-0 ${selectedUser?.id === user.id ? "text-bamboo" : "text-milk"}`}>
              <div className="font-medium truncate">{user.firstName +" "+ user.lastName}</div>
              <div className="text-sm">
                {onlineUsers.some((onlineUser) => onlineUser.id === user.id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))} 
      </div>
    </aside>
  )
}

export default InviteSearchPanel