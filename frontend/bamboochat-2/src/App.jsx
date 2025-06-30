import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Login/RegisterPage'
import ChatPage from './pages/Chat//ChatPage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { connectWebSocket, disconnectWebSocket } from "./socket/socket"
import ExplorePage from './pages/Explore/ExplorePage'
import { useChatStore } from './store/useChatStore'
import { useExploreStore } from './store/useExploreStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, setOnlineUsers } = useAuthStore();
  const { onInviteChange } = useExploreStore();
  const [prevUser, setPrevUser] = useState(null);
  const { getAllRooms } = useChatStore();
  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    console.log("authUser changed:", authUser);
    if (authUser) {
      getAllRooms(authUser.id);
      connectWebSocket(authUser, setOnlineUsers, onInviteChange);
      setPrevUser(authUser);
    } else {
      disconnectWebSocket(prevUser);
      setPrevUser(null);
    }
  }, [authUser]);

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )
  return (
    <div>
      <div className='flex flex-col lg:flex-row w-screen bg-milk h-screen overflow-auto'>
        <div className='flex flex-col items-center justify-center mx-[10px] lg:m-0 lg:ms-[10px] w-flex min-w-[80px] h-flex rounded-[10px]'>
            <NavBar img={authUser?.profilePic}/>
        </div>
        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}></Route>
          <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}></Route>
          <Route path='/register' element={!authUser ? <RegisterPage/> : <Navigate to="/"/>}></Route>
          <Route path='/chat' element= {authUser ? <ChatPage/> : <Navigate to="/login"/>}></Route>
          <Route path='/settings' element={<SettingsPage/>}></Route>
          <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}></Route>
          <Route path='/explore' element={authUser ? <ExplorePage/> : <Navigate to="/login"/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App