import React, { useEffect, useState } from 'react'
import bambooSvg from '../../assets/bamboo.svg'
import { User, Lock, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const { isLoggingIn, login } = useAuthStore();

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setLoginForm((pre) => ({
            ...pre,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(loginForm);
    }


  return (
    <div className='flex w-full bg-milk h-screen gap-[50px] p-[50px]'>
        {/* Login */}
        <div className='flex flex-col items-center bg-bamboo h-full w-1/2 rounded-[30px]'>
            <div className='px-[40px] pt-[90px] w-full'>
                <h1 className='text-milk font-bold text-4xl'>
                    Sign In
                </h1>
            </div>
            {/*  */}
            <div className='flex flex-col w-full px-[40px] pt-[40px]'>
                <form action="" onSubmit={handleSubmit} className='w-full'>
                    <div className='flex flex-col w-full gap-10'>
                        <div className='relative'>
                            <Mail size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
                            <input 
                                name='username'
                                value={loginForm.username}
                                onChange={handleOnChange}
                                type="email" 
                                className='pl-12 pr-3 w-full rounded-[10px] border-2 border-milk focus:border-textbox focus:outline-none h-[50px] bg-milk text-black placeholder:text-black' placeholder='Email'/>
                        </div>
                        <div className='relative'>
                            <Lock size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
                            <input 
                                name='password'
                                value={loginForm.password}
                                onChange={handleOnChange}
                                type={showPassword ? "text" : "password"} 
                                className='pl-12 pr-12 w-full rounded-[10px] border-2 border-milk focus:border-textbox focus:outline-none h-[50px] bg-milk text-black placeholder:text-black' placeholder='Password'
                                autoComplete="new-password"
                            />
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-black hover:scale-110'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                
                            </button>
                        </div>
                        <div className='w-full flex justify-end text-milk hover:text-oldBamboo underline'>
                            <Link to={"/register"}>Don't have an account? Sign Up</Link>
                        </div>
                        <button type='submit' className='w-full flex items-center justify-center gap-1 hover:opacity-80 font-bold text-xl text-bamboo bg-milk h-[50px] rounded-[10px]' disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin text-milk" />
                                    Loading...
                                </>
                            ) : (
                                'SIGN IN'
                            )}
                        
                        </button>
                    </div>
                </form>
            </div>
        </div>
        {/* logo */}
        <div className='flex flex-col items-center justify-center bg-paper w-1/2 h-full rounded-[30px]'>
            <img src={bambooSvg} alt="bamboo and panda" className='w-[500px] h-[500px]'/>
            <h1 className='font-bold text-4xl text-bamboo'>
                BAMBOO CHAT
            </h1>
        </div>
    </div>
  )
}

export default LoginPage