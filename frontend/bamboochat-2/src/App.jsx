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

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, setOnlineUsers } = useAuthStore();
  const [prevUser, setPrevUser] = useState(null);
  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    console.log("authUser changed:", authUser);
    if (authUser) {
      connectWebSocket(authUser, setOnlineUsers);
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
      <div className='flex w-screen bg-milk h-screen overflow-auto'>
        <div className='flex flex-col items-center justify-center bg-bamboo w-flex min-w-[80px] ms-[50px] my-[50px] h-flex rounded-[30px]'>
            <NavBar img={authUser?.profilePic}/>
        </div>
        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}></Route>
          <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}></Route>
          <Route path='/register' element={!authUser ? <RegisterPage/> : <Navigate to="/"/>}></Route>
          <Route path='/chat' element= {authUser ? <ChatPage/> : <Navigate to="/login"/>}></Route>
          <Route path='/settings' element={<SettingsPage/>}></Route>
          <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App