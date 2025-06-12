import React from 'react'

const UserCard = ({user}) => {
  return (
    <div className="flex items-center gap-4 p-2 hover:bg-oldBamboo cursor-pointer rounded-[30px]">
      <img
        src={user?.avatar || '/avatar.png'}
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover ms-2"
      />
      <div className="flex flex-col justify-center bg-milk ms-2 rounded-[20px] w-full ps-3 p-2 relative">
        <h2 className="text-base font-semibold text-black">{user?.username}</h2>
        <p className="text-xs text-gray-600 truncate max-w-[200px]">
          {user?.latestText}
        </p>
        {user?.unreadCount > 0 && (
            <div className="absolute right-3 top-1/3 -translate-y-1/2 bg-error text-milk text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {user?.unreadCount}
            </div>
        )}
      </div>
    </div>
  )
}

export default UserCard