import React from 'react'
import InviteSearchPanel from '../../components/explore/InviteSearchPanel'
import UserProfileCard from '../../components/explore/UserProfileCard'
import NoUserSelected from '../../components/explore/NoUserSelected'
import { useExploreStore } from '../../store/useExploreStore'

const ExplorePage = () => {
  const {selectedUser} = useExploreStore();
  return (
    <div className='flex w-full bg-milk h-screen gap-[50px] p-[50px]'>
        <div className='flex flex-col items-center gap-[50px] bg-milk h-full w-[35%] rounded-[30px]'>
            <InviteSearchPanel/>
        </div>
        <div className='flex flex-col items-center bg-paper h-full w-[65%] rounded-[30px] overflow-hidden p-3'>
          {!selectedUser ? <NoUserSelected /> : <UserProfileCard />}
        </div>
    </div>
  )
}

export default ExplorePage