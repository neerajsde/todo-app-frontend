import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiPasswordFill } from "react-icons/pi";
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
  const navigate = useNavigate();
  const {isLoading, setIsLoading, emailSend} = useContext(AppContext);
  const [isVisiable, setIsViaiable] = useState(false);
  const [isVisiableConf, setIsViaiableConf] = useState(false);
  const [someError, setSomeError] = useState('');
  const [password, setPassword] = useState({
    newPassword: '',
    confPassword: ''
  });

  function inputHandler(event){
    setPassword(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }))
  }

  const ObjectSend = {
    email:emailSend.email,
    newPassword: password.confPassword
  };

  const updatePassword = async () => {
    if(password.newPassword !== password.confPassword){
      setSomeError('password not match.');
      return;
    }
    try{
      setIsLoading(true);
      console.log('Sended: ',ObjectSend)
      const response = await fetch('https://todo-app-backend-l21h.onrender.com/api/v1/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ObjectSend)
      });

      const data = await response.json();
      if(!data.success){
        toast.error(data.message);
        setSomeError(data.message);
      }
      else{
        setSomeError(data.message);
        toast.success(data.message);
        navigate('/login');
      }
      setIsLoading(false);
    }
    catch(err){
      toast.error(err.message);
    }
  }

  useEffect(() => {
    document.title = 'Change Password'
  }, [])

  return (
    <div className='w-full max-w-[500px] flex flex-col items-center justify-center bg-slate-800 border border-slate-200 rounded-md gap-4 p-8'>
      <h2 className='text-3xl font-bold text-white'>Change Password</h2>

      {/* new-password */}
      <div className='w-[90%] flex flex-col gap-1 relative'>
        <label 
          className='text-base text-gray-200'
        >New Password</label>
        <div
          className='absolute bottom-2 left-2 text-2xl'
        ><RiLockPasswordFill/></div>
        <input
          type={isVisiable ? 'text' : 'password'}
          name='newPassword'
          placeholder='Enter new password'
          value={password.newPassword}
          className='w-full h-[40px] px-9 text-lg border-2 rounded outline-none border-red-500 transition duration-300 focus:border-green-500'
          onChange={inputHandler}
        />
        <div
          onClick={() => setIsViaiable(!isVisiable)}
          className='absolute bottom-2 right-2 text-2xl cursor-pointer'
        >
          {
            isVisiable ? 
            (<FaEye/>):
            (<FaEyeSlash/>)
          }
        </div>
      </div>

      {/* conform password */}
      <div className='w-[90%] flex flex-col gap-1 relative'>
        <label 
          className='text-base text-gray-200'
        >Conform Password</label>
        <div
          className='absolute bottom-2 left-2 text-2xl'
        ><PiPasswordFill/></div>
        <input
          type={isVisiableConf ? 'text' : 'password'}
          name='confPassword'
          placeholder='Re-enter password'
          value={password.confPassword}
          className='w-full h-[40px] px-9 text-lg border-2 rounded outline-none border-red-500 transition duration-300 focus:border-green-500'
          onChange={inputHandler}
        />
        <div
          onClick={() => setIsViaiableConf(!isVisiableConf)}
          className='absolute bottom-2 right-2 text-2xl cursor-pointer'
        >
          {
            isVisiableConf ? 
            (<FaEye/>):
            (<FaEyeSlash/>)
          }
        </div>
      </div>

      {
        someError && 
        (<div className='w-[90%] text-center text-base text-red-500 font-semibold'>
          {someError}
        </div>)
      }

      {/* update password */}
      <button
        className='w-[90%] flex items-center justify-center gap-2 py-1 border-2 rounded-md text-white text-xl font-semibold transition duration-300 ease-in hover:bg-slate-400 hover:text-slate-800'
        onClick={updatePassword}
      >Update Password {isLoading ? (<Spinner/>) : (<div></div>)}</button>
    </div>
  )
}

export default ChangePass