import { Square, SquareX, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="ps-3 pe-4 py-2.5 flex w-full bg-bamboo rounded-[25px] ">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.firstName + " " + selectedUser.lastName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.firstName + " " + selectedUser.lastName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="hover:scale-110 hover:text-error">
          <SquareX />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;