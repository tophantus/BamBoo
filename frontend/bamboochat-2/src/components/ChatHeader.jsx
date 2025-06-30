import { Square, SquareX, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, selectedRoom, setSelectedRoom, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();


  const isOnline = selectedRoom?.members?.some((m) => 
    m?.user?.id !== authUser.id &&
    onlineUsers?.some((online) => online?.id == m?.user?.id)
  )

  const otherUser = selectedRoom?.members?.find((m) => 
    m?.user?.id !== authUser.id
  )?.user

  return (
    <div className="ps-3 pe-4 py-2.5 flex w-full bg-bamboo rounded-[10px] ">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={otherUser.profilePic || "/avatar.png"} alt={otherUser.firstName + " " + onlineUsers.lastName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">
              { selectedRoom?.privateChat
                  ? otherUser.firstName + " " + otherUser.lastName
                  : selectedRoom?.name
              }
            </h3>
            <p className="text-sm text-base-content/70">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedRoom(null)} className="hover:scale-110 hover:text-error">
          <SquareX />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;