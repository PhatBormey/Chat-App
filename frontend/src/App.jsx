import './App.css'
import NavBar from './components/NavBar'
import FooTer from './components/Footer'
import { Routes,Route, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';
import {Loader} from 'lucide-react';
import {Toaster} from 'react-hot-toast';
import { useChatStore } from './store/useChatStore';


function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
  const {theme}=useThemeStore();
  const {getUsers} =useChatStore();
  
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  
  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  return (
    <div data-theme={theme} className='w-screen'>
      <NavBar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login'/>} />
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to='/'/>} />
        <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to='/'/>} />
        <Route path='/setting' element={<SettingPage/>} />
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>} />
      </Routes>
      {/* <FooTer/> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      
    </div>
  )
}

export default App
