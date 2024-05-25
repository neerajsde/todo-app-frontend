import React, { useContext, useEffect, useRef, useState } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import Spinner from '../components/Spinner';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading, emailSend, setEmailSend } = useContext(AppContext);
  const [emailFindError, setEmailFindError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [sendedOTP, setSendedOTP] = useState('');
  const [isSendOTP, setIsSendOTP] = useState(false);
  const [inputOTP, setInputOTP] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: '',
  });

  const inputRefs = {
    num1: useRef(null),
    num2: useRef(null),
    num3: useRef(null),
    num4: useRef(null),
    num5: useRef(null),
    num6: useRef(null),
  };

  function emailHandler(event) {
    setEmailSend({ email: event.target.value });
  }

  function otpHandler(event) {
    const { name, value } = event.target;

    if (!/^\d*$/.test(value)) {
      return;
    }

    setInputOTP(prevData => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });

    if (value.length >= 1) {
      const nextField = {
        num1: 'num2',
        num2: 'num3',
        num3: 'num4',
        num4: 'num5',
        num5: 'num6'
      }[name];

      if (nextField && inputRefs[nextField].current) {
        inputRefs[nextField].current.focus();
      }
    }
  }

  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);

  const sendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://todo-app-backend-l21h.onrender.com/api/v1/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailSend)
      });

      const data = await response.json();
      setIsLoading(false);

      if (!data.success) {
        setEmailFindError(data.message);
        toast.error(data.message);
      } else {
        setIsSendOTP(true);
        setSendedOTP(data.otp);
        setEmailFindError('');
        toast.success(data.message);
      }
    } catch (err) {
      setIsLoading(false);
      setIsSendOTP(false);
      toast.error(err.message);
    }
  };

  const verifyOTP = () => {
    setIsLoading(true);
    const otpString = Object.values(inputOTP).join('');
    if (otpString === sendedOTP) {
      navigate('/change-password');
      toast.success("OTP verified successfully");
    } else {
      setOtpError("Incorrect OTP");
      toast.error("Incorrect OTP");
    }
    setIsLoading(false);
  };

  return (
    <div className='w-full max-w-[500px] flex flex-col items-center justify-center bg-slate-800 border border-slate-200 rounded-md gap-4 p-8'>
      <h1 className='text-3xl font-bold text-white'>Forgot Password</h1>
      <div className='w-[90%] relative'>
        <input
          type='email'
          placeholder='Enter Your Email'
          name='email'
          value={emailSend.email}
          onChange={emailHandler}
          className='w-full pl-10 py-2 px-4 text-xl bg-slate-400 font-medium outline-none border-2 border-red-400 rounded focus:border-green-400 placeholder:text-slate-600'
        />
        <div className='absolute top-3 left-3 text-2xl cursor-pointer text-slate-800'>
          <HiOutlineMail />
        </div>
        {emailFindError && (
          <div className='text-sm text-red-500 pl-2'>{emailFindError}</div>
        )}
      </div>

      {isSendOTP && (
        <div className='w-[90%]'>
          <h3 className='text-gray-200 font-bold text-xl'>Enter OTP</h3>
          <div className='w-full flex justify-between items-center'>
            {Object.keys(inputRefs).map((key, index) => (
              <input
                key={index}
                type='text'
                name={key}
                placeholder='-'
                value={inputOTP[key]}
                onChange={otpHandler}
                ref={inputRefs[key]}
                className='w-[50px] h-[40px] border-2 border-red-500 text-center text-2xl font-bold rounded outline-none focus:border-green-500'
                maxLength='1'
              />
            ))}
          </div>
          {
            otpError === '' ? 
            (<div></div>) :
            (
              <div className='text-sm text-red-500 pl-2'>
                {otpError}
              </div>
            )
          }
        </div>
      )}

      {isSendOTP ? (
        <button
          onClick={verifyOTP}
          className='w-[90%] flex items-center justify-center gap-2 py-1 border-2 rounded-md text-white text-xl font-semibold transition duration-300 ease-in hover:bg-slate-400 hover:text-slate-800'
        >
          Verify OTP {isLoading && <Spinner />}
        </button>
      ) : (
        <button
          onClick={sendOTP}
          className='w-[90%] flex items-center justify-center gap-2 py-1 border-2 rounded-md text-white text-xl font-semibold transition duration-300 ease-in hover:bg-slate-400 hover:text-slate-800'
        >
          Send Code {isLoading && <Spinner />}
        </button>
      )}
    </div>
  );
};

export default ForgotPass;