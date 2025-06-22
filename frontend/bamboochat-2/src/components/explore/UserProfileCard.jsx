import React from 'react'
import { useExploreStore } from '../../store/useExploreStore'
import { useAuthStore } from '../../store/useAuthStore';
import { Square, SquareX, X } from "lucide-react";

const UserProfileCard = () => {
  const {selectedUser, setSelectedUser} = useExploreStore();
  const { onlineUsers, authUser } = useAuthStore();

  const isOnline = onlineUsers?.some((online) =>
    online.id === selectedUser.id
  );
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
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button onClick={() => setSelectedUser(null)} className="hover:scale-110 hover:text-error">
            <SquareX />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard