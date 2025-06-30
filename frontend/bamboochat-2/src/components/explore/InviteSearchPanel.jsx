import React, { useEffect, useState } from 'react'
import { useExploreStore } from '../../store/useExploreStore';
import { Check, MessageCircle, UserMinus2, UserPlus2, Users, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import { useNavigate } from 'react-router-dom';

const InviteSearchPanel = () => {
  const {
    selectedUser,
    setSelectedUser, 
    users, 
    getUsers, 
    pendingInvites,
    selectedInvite, 
    setSelectedInvite, 
    getAllPendingInvites,
    acceptInvite,
    rejectInvite,
    sendInvite,
    removePrivateChatRoom
  } = useExploreStore();

  const {rooms, setSelectedRoom} = useChatStore();
  const [activeTab, setActiveTab] = useState("INVITE");
  const { onlineUsers, authUser } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    getAllPendingInvites(authUser?.id);
  }, [])

  return (
    <aside className="h-full w-full lg:w-max-[300px] bg-bamboo flex flex-col rounded-[10px] transition-all duration-200">
      <div className=" border-oldBamboo w-full p-5 overflow-hidden">
        <div className="flex items-center gap-2 text-milk">
          <Users className="size-6" />
          <span className="font-medium block">Community</span>
        </div>
        <div className="flex">
          <button
            className={`flex-1 text-center py-2 hover:scale-105  text-milk ${
              activeTab === "INVITE"
                ? "border-b-2 border-milk font-bold text-milk"
                : "font-medium"
            }`}
            onClick={() => setActiveTab("INVITE")}
          >
            INVITE FRIENDS
          </button>
          <button
            className={`flex-1 text-center py-2 hover:scale-105 text-milk ${
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

      {activeTab === "INVITE" &&
      <div className="overflow-y-auto w-full h-full py-3">
        {users.map((user) => {
          const isSender = pendingInvites.some((i) => 
            i.senderId === user.id
          )

          const invite = pendingInvites.find((i) => 
            i.senderId === user.id
          )

          const isRecipient = pendingInvites.some((i) => 
            i.recipientId === user.id
          )

          const alreadyAddFriend = rooms.some((r) => 
            r.privateChat &&
            r.members.some((m) => 
              m.user.id === user.id
            )
          ) 

          console.log("s", isSender, "r", isRecipient, "a", alreadyAddFriend)

          return (
            <div
              key={user?.id}
              onClick={() => {
                setSelectedUser(user)
                if (isSender) setSelectedInvite(invite)
              }}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-oldBamboo bg-opacity-80 transition-colors
                ${selectedUser?.id === user.id ? "bg-oldBamboo" : ""}
              `}
            >
              <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.lastName}
                  className="size-12 w-12 object-cover rounded-full"
                />
                {onlineUsers.some((onlineUser) => onlineUser.id === user.id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              <div className={`block text-left w-full lg:min-w-0 ${selectedUser?.id === user.id ? "text-bamboo" : "text-milk"}`}>
                <div className="font-medium truncate">{user.firstName +" "+ user.lastName}</div>
                <div className="text-sm">
                  {onlineUsers.some((onlineUser) => onlineUser.id === user.id) ? "Online" : "Offline"}
                </div>
              </div>
              <div className='ml-auto flex flex-row gap-2'>
                {isRecipient &&
                  <button>
                    Pending...
                  </button>
                }
                {alreadyAddFriend && 
                  <>
                    <button 
                      className={`hover:text-bamboo hover:scale-105 p-2`}
                      onClick={() => {
                        const room = rooms.find((r) => 
                          r.privateChat &&
                          r.members.some((m) => 
                          m.user.id === user.id
                        ))
                        setSelectedRoom(room);
                        navigate("/chat")
                      }
                    }>
                      <MessageCircle/>
                    </button> 

                    <button 
                      className={`hover:text-bamboo hover:scale-105 p-2`}
                      onClick={() => {
                        const room = rooms.find((r) => 
                          r.privateChat &&
                          r.members.some((m) => 
                          m.user.id === user.id
                        ))
                        const request = {
                          roomId: room?.id,
                          requesterId: authUser?.id
                        }
                        removePrivateChatRoom(request);
                      }
                    }>
                      <UserMinus2/>
                    </button> 
                  </>
                }
                {
                  !isRecipient && !isSender && !alreadyAddFriend &&
                  <button 
                    className={`hover:text-bamboo hover:scale-105 p-2`}
                    onClick={() => {
                      const invite = {
                        senderId: authUser.id,
                        recipientId: user?.id
                      }
                      sendInvite(invite)
                      console.log("send Invite")
                    }
                  }>
                    <UserPlus2/>
                  </button>
                }
                {isSender &&
                  <>
                    <button 
                      className={`hover:text-bamboo hover:scale-105 p-2`}
                      onClick={() => {
                        acceptInvite({
                          inviteId: invite?.id
                        })
                      }}
                    >
                      <Check/>
                    </button>
                    <button 
                      className={`hover:text-error hover:scale-105 p-2`}
                      onClick={() => {
                        rejectInvite({
                          inviteId: invite?.id
                      })
                    }}
                    >
                      <X/>
                    </button>
                  </>
                }
              </div>
              
            </div>
        )})} 
      </div>}

      {activeTab === "PENDING" &&
      <div className="overflow-y-auto w-full h-full py-3">
        {users.map((user) => {
          const isSender = pendingInvites.some((i) => 
            i.senderId === user.id
          )
          const isRecipient = pendingInvites.some((i) => 
            i.recipientId === user.id
          )
          const invite = pendingInvites.find((i) => 
            i.senderId === user.id
          )
          return (
            isSender || isRecipient? 
            <div
              key={user?.id}
              onClick={() => {
                  setSelectedUser(user)
                  setSelectedInvite(invite)
                }
              }
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-oldBamboo bg-opacity-80 transition-colors
                ${selectedUser?.id === user.id ? "bg-oldBamboo" : ""}
              `}
            >
              <div className="relative flex-shrink-0 mx-auto lg:mx-0">
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

              <div className={`block text-left w-full lg:min-w-0 ${selectedUser?.id === user.id ? "text-bamboo" : "text-milk"}`}>
                <div className="font-medium truncate">{user.firstName +" "+ user.lastName}</div>
                <div className="text-sm">
                  {onlineUsers.some((onlineUser) => onlineUser.id === user.id) ? "Online" : "Offline"}
                </div>
              </div>
              <div className='ml-auto flex flex-row gap-2'>
                {isSender &&
                  <>
                    <button 
                      className={`hover:text-bamboo hover:scale-105 p-2`}
                      onClick={() => {
                        setSelectedInvite(invite)
                        acceptInvite({
                          inviteId: selectedInvite?.id
                        })
                      }}
                    >
                      <Check/>
                    </button>
                    <button 
                      className={`hover:text-error hover:scale-105 p-2`}
                      onClick={() => {
                        setSelectedInvite(invite)
                        rejectInvite({
                          inviteId: selectedInvite?.id
                        })
                        set
                      }}
                    >
                      <X/>
                    </button>
                  </>
                }
                {isRecipient &&
                  <button>
                    Pending...
                  </button>
                }
              </div>
              
            </div> : <></>
        )})} 
      </div>}
    </aside>
  )
}

export default InviteSearchPanel