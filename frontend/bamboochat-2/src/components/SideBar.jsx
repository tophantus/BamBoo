import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Annoyed, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const SideBar = () => {
    const {getUsers, getAllRooms, selectedUser, setSelectedUser, setSelectedRoom, selectedRoom, isUsersLoading, pendingMessages, removePendingMessage} = useChatStore();
    const users = useChatStore((state) => state.users);
    const rooms = useChatStore((state) => state.rooms);
    const authUser = useAuthStore((state) => state.authUser);
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    useEffect (() => {
        getAllRooms(authUser.id)
    }, [])

    const filteredRooms = showOnlineOnly
      ? rooms?.filter((room) => 
          room?.members?.some((member) => 
            member?.user?.id !== authUser.id && 
            onlineUsers?.some((online) => online?.id === member.user.id)
          )
        )
      : rooms;

    const onlineRooms = rooms?.filter((room) => 
          room?.members?.some((member) => 
            member?.user?.id !== authUser.id && 
            onlineUsers?.some((online) => online?.id === member.user.id)
          )
        )
    const onlineNum = onlineUsers?.filter((o) => 
      rooms?.some((r) => 
        r?.members?.some((m) => 
          m?.user?.id === o?.id &&
          m?.user?.id !== authUser?.id
        )
      )
    ).length


  return (
    <aside className="h-full w-20 lg:w-full lg:w-max-[300px] bg-bamboo flex flex-col rounded-[10px] transition-all duration-200">
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
          <span className="text-xs text-oldBamboo">({onlineNum >= 0 ? onlineNum : 0} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full h-full py-3">

        {filteredRooms.map((room) => {

          const numOfPendingMessage = pendingMessages.filter((msg) => 
            msg.roomId === room.id
          ).length;
          return (
            <button
              key={room?.id}
              onClick={() => setSelectedRoom(room)}
              className={`
                relative w-full p-3 flex items-center gap-3
                hover:bg-oldBamboo bg-opacity-80 transition-colors
                ${selectedRoom?.id === room.id ? "bg-oldBamboo" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={
                    room?.privateChar 
                      ? room?.members[0]?.user?.profilePic || "/avatar.png"
                      : room?.members.find((m) => 
                        m?.user?.id !== authUser?.id
                      )?.user?.profilePic
                  }
                  alt={room.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineRooms.some((onlineRoom) => onlineRoom.id === room.id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className={`hidden lg:block text-left min-w-0 ${selectedRoom?.id === room.id ? "text-bamboo" : "text-milk"}`}>
                <div className="font-medium truncate">
                  {room.privateChat 
                    ? (() => {
                        const user = room?.members?.find(m => m?.user?.id !== authUser.id)?.user;
                        return `${user?.lastName ?? ""} ${user?.firstName ?? ""}`;
                      })()
                    : room.name
                  }
                </div>
                <div className="text-sm">
                  {onlineRooms.some((onlineRoom) => onlineRoom.id === room.id) ? "Online" : "Offline"}
                </div>
              </div>
              {numOfPendingMessage > 0 && (
                <span 
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold 
                  rounded-full min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center shadow-md"
                >
                  {numOfPendingMessage > 9 ? '9+' : numOfPendingMessage}
                </span>
              )}
            </button>
          )})
        }

        {filteredRooms.length === 0 && (
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