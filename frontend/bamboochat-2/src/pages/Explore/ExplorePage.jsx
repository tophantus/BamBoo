import React from 'react'
import InviteSearchPanel from '../../components/explore/InviteSearchPanel'
import UserProfileCard from '../../components/explore/UserProfileCard'
import NoUserSelected from '../../components/explore/NoUserSelected'
import { useExploreStore } from '../../store/useExploreStore'

const ExplorePage = () => {
  const {selectedUser} = useExploreStore();
  return (
    <div className='flex w-full bg-milk h-screen gap-[10px] p-[10px]'>
        <div className='flex flex-col items-center gap-[10px] bg-milk h-full w-full lg:w-[35%] rounded-[10px]'>
            <InviteSearchPanel/>
        </div>
        <div className='hidden lg:flex flex-col items-center bg-paper h-full w-full lg:w-[65%] rounded-[10px] overflow-hidden p-3'>
          {!selectedUser ? <NoUserSelected /> : <UserProfileCard />}
        </div>
    </div>
  )
}

export default ExplorePage