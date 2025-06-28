import React, { useEffect, useState } from 'react'
import { useExploreStore } from '../../store/useExploreStore'
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, MessageCircle, Phone, Square, SquareX, User, UserPlus2, X } from "lucide-react";
import { useChatStore } from '../../store/useChatStore';
import { useNavigate } from 'react-router-dom';

const UserProfileCard = () => {
  const {selectedUser, setSelectedUser, isInviteLoading, pendingInvites} = useExploreStore();
  const { onlineUsers, authUser } = useAuthStore();
  const {rooms, setSelectedRoom} = useChatStore();

  const navigate = useNavigate();
  const [friendStatus, setFriendStatus] = useState(
    {}
  )

  useEffect(() => {
    const isSender = pendingInvites?.some((i) => 
      i.senderId === selectedUser?.id
    )

    const isRecipient = pendingInvites?.some((i) => 
      i.recipientId === selectedUser?.id
    )

    const alreadyAddFriend = rooms?.some((r) => 
      r.privateChat &&
      r.members.some((m) => 
        m.user.id === selectedUser?.id
      )
    ) 

    const isOnline = onlineUsers?.some((online) =>
      online.id === selectedUser?.id
    );

    setFriendStatus({
      isSender: isSender,
      isRecipient: isRecipient,
      alreadyAddFriend: alreadyAddFriend,
      isOnline: isOnline
    })

    console.log(friendStatus)
  }, [selectedUser])

  useEffect(() => {
  console.log("Updated friendStatus:", friendStatus);
}, [friendStatus]);

  
  return (
    <div className="flex-1 w-full flex flex-col overflow-auto ">
      <div className="ps-3 pe-4 py-2.5 flex w-full bg-bamboo rounded-[25px] ">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser.firstName + " " + selectedUser.lastName} />
              </div>
            </div>

            {/* User info */}
            <div>
              <h3 className="font-medium">
                  {selectedUser.firstName + " " + selectedUser.lastName}
              </h3>
              <p className="text-sm text-base-content/70">
                {friendStatus.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button onClick={() => setSelectedUser(null)} className="hover:scale-110 hover:text-error">
            <SquareX />
          </button>
        </div>
      </div>

      <div className='flex flex-col items-center bg-paper h-full scrollbar-hide overflow-auto w-full max-w-[1000px] rounded-[30px]'>
             {/* avatar upload section */}
            <div className="flex flex-col items-center pt-8 gap-4">
              <div className="relative">
                <img
                  src={selectedUser?.profilePic || "/avatar.jpg"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-bamboo"
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <div className="space-y-6 pt-8 min-w-[200px]">
          
                <div className="space-y-1.5">
                  <div className="text-sm text-textbox flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  <div className="ps-4 pe-2.5 py-2.5 flex items-center bg-bamboo text-milk rounded-lg border">
                    <div className='flex-1'>
                      <p>{selectedUser?.firstName + " " + selectedUser?.lastName}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-textbox flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                  <div className="ps-4 pe-2.5 py-2.5 bg-bamboo flex items-center rounded-lg border">
                    <div className='flex-1'>
                      <p>{selectedUser?.phoneNumber + " " }</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-textbox flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <div className="px-4 py-2.5 bg-bamboo rounded-lg border">
                    <p className="">{selectedUser?.email + " "}</p>
                  </div>
                </div>
              </div>
            </div>           
        </div>

        <div className='flex flex-row items-center w-full h-[25%] justify-around'>
          {friendStatus.isSender &&
            <>
            <button className='w-[200px] flex items-center justify-center  hover:opacity-80 hover:scale-105 font-bold text-xl text-milk bg-bamboo h-[50px] rounded-[10px]' disabled={isInviteLoading}>
              ACCEPT
            </button>
            <button className='w-[200px] flex items-center justify-center hover:opacity-80 hover:scale-105 hover:bg-error font-bold text-xl text-milk bg-bamboo h-[50px] rounded-[10px]' disabled={isInviteLoading}>
                REJECT
            </button>
            </>
          }
          {friendStatus.isRecipient &&
            <button className='w-[200px] flex items-center justify-center  hover:opacity-80 hover:scale-105 font-bold text-xl text-milk bg-oldBamboo h-[50px] rounded-[10px]' disabled={isInviteLoading}>
              PENDING...
            </button>
          }
          {friendStatus.alreadyAddFriend &&
            <button 
              className='w-[200px] flex items-center justify-center  hover:opacity-80 hover:scale-105 font-bold text-xl text-milk bg-bamboo h-[50px] rounded-[10px]' disabled={isInviteLoading}
              onClick={() => {
                const room = rooms.find((r) => 
                  r.privateChat &&
                  r.members.some((m) => 
                  m.user.id === selectedUser?.id
                ))
                setSelectedRoom(room);
                navigate("/chat")
              }}
            >
              <MessageCircle/>
              CHAT
            </button>
          }
          {!friendStatus.isSender && !friendStatus.isRecipient && !friendStatus.alreadyAddFriend &&
            <button className='w-[200px] flex items-center justify-center  hover:opacity-80 hover:scale-105 font-bold text-xl text-milk bg-bamboo h-[50px] rounded-[10px]' disabled={isInviteLoading}>
              <UserPlus2/>
              INVITE
            </button>
          }
        </div>

    </div>
  )
}

export default UserProfileCard