import React, { useState } from 'react'
import bambooSvg from '../../assets/bamboo.svg'
import { User, Lock, Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import { useAuthStore } from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import VerifyCodeSection from '../../components/VerifyCodeSection';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isVerifyCode, setIsVerifyCode] = useState(false);
    const [code, setCode] = useState(Array(6).fill(""));
    const navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState({
        email: "",
        password: ""
    })

    const { isSigningUp, signup, isVerifying, verify } = useAuthStore();


    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setRegisterForm((pre) => ({
            ...pre,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("RegisterForm", registerForm)
        const success = await signup(registerForm);
        if (success) {
            setIsVerifyCode(true);
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        if ( await verify({
            username: registerForm?.email,
            code: code.join("")
        })) {
            navigate("/login")
        }
    }

  return (
    <div className='flex w-full bg-milk h-screen gap-[50px] p-[50px]'>
        {/* logo */}
        <div className='flex flex-col items-center justify-center bg-bamboo w-1/2 h-full rounded-[30px]'>
            <img src={bambooSvg} alt="bamboo and panda" className='w-[500px] h-[500px]'/>
            <h1 className='font-bold text-4xl text-milk'>
                BAMBOO CHAT
            </h1>
        </div>
        {/* Login */}
        <div className='flex flex-col items-center bg-paper h-full w-1/2 rounded-[30px]'>
            <div className='px-[40px] pt-[90px] w-full'>
                <h1 className='text-bamboo font-bold text-4xl'>
                    {
                        isVerifyCode ? "Verify" : "Sign Up"
                    }
                </h1>
            </div>
            {/*  */}
            <div className='flex flex-col w-full px-[40px] pt-[40px]'>
                { isVerifyCode && 
                    <>
                        <div className='flex flex-col gap-6'>
                            <p className="text-gray-600 text-center mb-6">
                                We've sent a 6-digit verification code to{" "}
                                <span className="font-bold">your.email@example.com</span>
                                <br />
                                Please enter it below to verify your account.
                            </p>
                            <VerifyCodeSection code={code} setCode={setCode}/>
                            <button
                                onClick={handleVerify}
                                disabled={code.join("").length !== 6 || isVerifying}
                                className={`w-full  flex items-center justify-center gap-1 hover:opacity-80 font-bold text-xl h-[50px] rounded-[10px] transition duration-200 ${
                                isVerifying || code.join("").length !== 6
                                    ? "bg-textbox cursor-not-allowed"
                                    : "bg-bamboo hover:bg-opacity-80 cursor-pointer"
                                }`}
                            >
                                {isVerifying ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin text-milk" />
                                        Verifying...
                                    </>
                                ) : (
                                    'VERIFY'
                                )}
                            </button>
                        </div>
                        

                    </>
                }
                {!isVerifyCode &&
                    <form action="" onSubmit={handleSubmit} className='w-full'>
                        <div className='flex flex-col w-full gap-10'>
                            <div className='relative'>
                                <Mail size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
                                <input 
                                    name='email'
                                    value={registerForm.email}
                                    onChange={handleOnChange}
                                    type="email" 
                                    className='pl-12 pr-3 w-full rounded-[10px] border-2 border-textbox focus:border-bamboo focus:outline-none h-[50px] bg-textbox text-black placeholder:text-black' placeholder='Email'/>
                            </div>
                            <div className='relative'>
                                <Lock size={20} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-black'/>
                                <input 
                                    name='password'
                                    value={registerForm.password}
                                    onChange={handleOnChange}
                                    type={showPassword ? "text" : "password"} 
                                    className='pl-12 pr-12 w-full rounded-[10px] border-2 border-textbox focus:border-bamboo focus:outline-none h-[50px] bg-textbox text-black placeholder:text-black' placeholder='Password'
                                    autoComplete="new-password"
                                />
                                
                                <button
                                    type='button'
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-black'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                    
                                </button>
                            </div>
                            <div className='w-full flex justify-end text-textbox hover:text-bamboo underline'>
                                <Link to={"/login"}>Already have an account? Sign In</Link>
                            </div>
                            <button type='submit' className='w-full flex items-center justify-center gap-1 font-bold text-xl text-milk bg-bamboo h-[50px] rounded-[10px]' disabled={isSigningUp}>
                                {isSigningUp ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin text-milk" />
                                        Loading...
                                    </>
                                ) : (
                                    'SIGN UP'
                                )}
                            
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    </div>
  )
}

export default RegisterPage