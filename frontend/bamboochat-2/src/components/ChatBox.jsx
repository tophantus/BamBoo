import React from 'react';

// Hàm định dạng giờ:phút
const formatTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Hàm định dạng ngày, ví dụ "June 3, 2025"
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Hàm nhóm tin nhắn theo ngày
const groupMessagesByDate = (messages) => {
  return messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toDateString(); // Lấy ngày dạng "Tue Jun 03 2025"
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});
};

const ChatBox = ({ currentUser, otherUser, messages }) => {
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-y-auto scrollbar-hide gap-4">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date} className="flex flex-col gap-4">
          {/* Hiển thị ngày */}
          <div className="flex justify-center">
            <span className="bg-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold select-none">
              {formatDate(date)}
            </span>
          </div>

          {/* Tin nhắn trong ngày */}
          {msgs.map((msg) => {
            const isSender = msg.sender === currentUser.username;

            return (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${
                  isSender ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-end gap-2">
                  {!isSender && (
                    <img
                      src={otherUser.avatar}
                      alt={otherUser.username}
                      className="w-8 h-8 rounded-full"
                    />
                  )}

                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                      isSender
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {isSender && (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.username}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
                {/* Timestamp */}
                <span
                  className={`text-xs text-gray-500 ${
                    isSender ? 'text-right pr-10' : 'pl-10 text-left'
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
