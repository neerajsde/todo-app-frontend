import React, { createContext, useState } from "react";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [error, setError] = useState('');
  const [editTask, setEditTask] = useState('');
  const [isActiveEditTask, setIsActiveEditTask] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [emailSend, setEmailSend] = useState({ email: '' });

  const isDataFilled = (data) => {
    return data.email.trim() !== '' && data.password.trim() !== '';
  };

  const userlogin = async (userdata) => {
    if (!isDataFilled(userdata)) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    try {
      setIsLoading(true);
  
      const fetchUser = async (url) => {
        // console.log("Sending user data:", userdata);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userdata)
        });
        return response;
      };
  
      const userEndpoint = `https://todo-app-backend-l21h.onrender.com/api/v1/user`;
      const loginEndpoint = `https://todo-app-backend-l21h.onrender.com/api/v1/login`;
      let response;
  
      try {
        response = await fetchUser(userEndpoint);
        if (!response.ok) throw new Error('User registration failed');
      } catch (registrationError) {
        // toast.error('User registration failed, attempting login:', registrationError.message);
        response = await fetchUser(loginEndpoint);
      }
  
      if (!response.ok) {
        let errorMessage = 'Failed to login';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        // console.log("Login error:", errorMessage);
        toast.error(errorMessage);
  
        if (errorMessage === 'user not found.' || errorMessage === 'invalid email id') {
          setEmailError(errorMessage);
        } else if (errorMessage === 'invalid password' || errorMessage === 'wrong password') {
          setPassError(errorMessage);
        } else {
          setError(errorMessage);
        }
      } else {
        const data = await response.json();
        // console.log('User Logged In Successfully:', data);
        setData(data);
        setIsLogedIn(true);
        setEmailError('');
        setPassError('');
        setError('');
        navigate('/');
        toast.success("Logged in successfully");
      }
  
    } catch (err) {
      // console.log('Error in login:', err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };  

  const signupHandler = async (userData) => {
    if (!isDataFilled(userData)) {
      toast.error('Please fill in all fields.');
      return;
    }
    try{
      setIsLoading(true);
        const url = `https://todo-app-backend-l21h.onrender.com/api/v1/create/user`;
        // console.log("Sending user data:", userData);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if(!response.ok){
            let errorMessage = 'Failed to Sign Up';
            try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
            } catch (jsonError) {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
            }
            // console.log("Login error:", errorMessage);
            toast.error(errorMessage);
        }
        else{
          const data = await response.json();
          // console.log('User Signed up Successfully:', data);
          setData(data);
          setIsLogedIn(true);
          navigate('/');
          toast.success("Signed up successfully");
        }
        setIsLoading(false);
    }
    catch(err){
      setIsLoading(false);
      // console.log('Error in Sign Up:', err.message);
      toast.error(err.message);
    }
  }

  const deleteTask = async(taskData) => {
    try{
      const url = `https://todo-app-backend-l21h.onrender.com/api/v1/deleteTask`;
      const response = await fetch(url, {
          method: 'DELETE',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
      });

      if(!response.ok){
        let errorMessage = 'Failed to Delete task';
        try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
        }
        // console.log("Delete Task error:", errorMessage);
        toast.error(errorMessage);
      }
      else{
        const data = await response.json();
        // console.log('Task Deleted Successfully:', data);
        setData(data);
        toast.success("Task Deleted successfully");
      }
    }
    catch(err){
      // console.log('Error in Delete Task:', err.message);
      toast.error(err.message);
    }
  }

  const value = {
    userlogin,
    signupHandler,
    deleteTask,
    isLoading,
    setIsLoading,
    data,
    setData,
    isLogedIn,
    setIsLogedIn,
    emailError,
    setEmailError,
    passError,
    setPassError,
    error,
    setError,
    editTask, 
    setEditTask,
    isActiveEditTask, 
    setIsActiveEditTask,
    taskId, 
    setTaskId,
    emailSend, 
    setEmailSend
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;