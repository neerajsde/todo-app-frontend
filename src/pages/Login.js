import React, { useContext, useEffect, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import Spinner from '../components/Spinner';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { userlogin, isLoading, emailError, passError, error } = useContext(AppContext);
  const [isVisiable, setIsVisiable] = useState(false);
  const [userdata, setUserData] = useState({
    email: "",
    password: ""
  });

  function inputHandler(event) {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  useEffect(() => {
    document.title = 'Todo - Login'
  },[]);

  return (
    <div className='w-full max-w-[500px] flex flex-col items-center justify-center bg-slate-800 border border-slate-200 rounded-md gap-4 p-8'>
      <h1 className='text-3xl font-bold text-white'>Login</h1>
      <div className='w-[90%] relative'>
        <input
          type='email'
          placeholder='Enter Your Email'
          name='email'
          value={userdata.email}
          onChange={inputHandler}
          className='w-full pl-10 py-2 px-4 text-xl bg-slate-400 font-medium outline-none border-2 border-red-400 rounded focus:border-green-400 placeholder:text-slate-600'
        />
        <div className='absolute top-3 left-3 text-2xl cursor-pointer text-slate-800'>
          <HiOutlineMail />
        </div>
        {emailError === '' ? 
          (<div></div>) : 
          (<div className='text-sm text-red-500 pl-2'>{emailError}</div>)
        }
      </div>

      <div className='w-[90%] relative'>
        <div className='absolute top-3 left-3 text-2xl cursor-pointer text-slate-800'>
          <RiLockPasswordFill />
        </div>
        <input
          type={isVisiable ? 'text' : 'password'}
          placeholder='Enter Your Password'
          name='password'
          value={userdata.password}
          onChange={inputHandler}
          className='w-full py-2 px-10 text-xl font-medium bg-slate-400 outline-none border-2 border-red-400 rounded focus:border-green-400 placeholder:text-slate-600'
        />
        <div
          className='absolute top-3 right-3 text-2xl cursor-pointer text-slate-800'
          onClick={() => setIsVisiable(!isVisiable)}
        >
          {isVisiable ? (<IoMdEye />) : (<IoMdEyeOff />)}
        </div>
        {passError === '' ? 
          (<div></div>) : 
          (<div className='text-sm text-red-500 pl-2'>{passError}</div>)
        }
      </div>

      {error === '' ? 
          (<div className='invisible'></div>) : 
          (<div className='text-sm text-red-500 pl-2'>{error}</div>)
      }

      <p 
        className='text-lg font-normal text-white hover:underline cursor-pointer'
        onClick={() => navigate('/forgot-password')}
      >Forgot Password?</p>

      <button
        className='w-[90%] flex items-center justify-center gap-2 py-1 border-2 rounded-md text-white text-xl font-semibold transition duration-300 ease-in hover:bg-slate-400 hover:text-slate-800'
        onClick={() => userlogin(userdata)}
      >Login {isLoading ? (<Spinner/>) : (<div></div>)}</button>

      <div className='w-[90%] flex items-center justify-between gap-1'>
        <div className='w-full h-[2px] bg-slate-500'></div>
        <p className='text-xl text-slate-300'>OR</p>
        <div className='w-full h-[2px] bg-slate-500'></div>
      </div>

      <button
        className='w-[90%] py-1 border-2 rounded-md text-white text-xl font-semibold transition duration-300 ease-in hover:bg-slate-400 hover:text-slate-800'
        onClick={() => navigate('/signup')}
      >Register new user</button>
    </div>
  );
}

export default Login;