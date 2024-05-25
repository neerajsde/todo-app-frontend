import React, { useContext, useState, useEffect } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdEmail, MdDateRange } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Spinner from '../components/Spinner';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const { isLoading, emailError, passError, error, signupHandler } = useContext(AppContext);
    const [isVisiable, setIsVisiable] = useState(false);
    const [userdata, setUserData] = useState({
        name:"",
        age:"",
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
      document.title = 'Todo - Register'
    },[]);
  
    return (
      <div className='w-full max-w-[500px] flex flex-col items-center justify-center bg-slate-800 border border-slate-200 rounded-md gap-4 p-8'>
        <h1 className='text-3xl font-bold text-white'>Register new-user</h1>
        <div className='w-[90%] relative'>
            <input
                type='name'
                placeholder='Enter Full Name'
                name='name'
                value={userdata.name}
                onChange={inputHandler}
                className='w-full pl-10 py-2 px-4 text-xl bg-slate-400 font-medium outline-none border-2 border-red-400 rounded focus:border-green-400 placeholder:text-slate-600'
            />
            <div className='absolute top-3 left-3 text-2xl cursor-pointer text-slate-800'>
                <FaUser/>
            </div>
        </div>

        <div className='w-[90%] relative'>
            <input
                type='number'
                placeholder='Enter Your Age'
                name='age'
                value={userdata.age}
                onChange={inputHandler}
                className='w-full pl-10 py-2 px-4 text-xl bg-slate-400 font-medium outline-none border-2 border-red-400 rounded focus:border-green-400 placeholder:text-slate-600'
            />
            <div className='absolute top-3 left-3 text-2xl cursor-pointer text-slate-800'>
                <MdDateRange/>
            </div>
        </div>
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
            <MdEmail />
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
  
        <button
          className='w-[90%] flex items-center justify-center gap-2 py-1 border-2 rounded-md text-white text-xl font-semibold transition duration-300 ease-in hover:bg-slate-400 hover:text-slate-800'
          onClick={() => signupHandler(userdata)}
        >Sign Up {isLoading ? (<Spinner/>) : (<div></div>)}</button>
  
        <div className='w-[90%] flex items-center justify-between gap-1'>
          <div className='w-full h-[2px] bg-slate-500'></div>
          <p className='text-xl text-slate-300'>OR</p>
          <div className='w-full h-[2px] bg-slate-500'></div>
        </div>
  
        <button
          className='w-[90%] py-1 border-2 rounded-md text-white text-xl font-semibold transition duration-300 ease-in hover:bg-slate-400 hover:text-slate-800'
          onClick={() => navigate('/login')}
        >Login</button>
      </div>
    );
}

export default Signup