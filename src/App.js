import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useContext, useEffect, useState } from 'react';
import { FaUser, FaUserCheck } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AppContext } from './context/AppContext';
import Signup from './pages/Signup';
import ForgotPass from './pages/ForgotPass';
import ChangePass from './pages/ChangePass';

function App() {
  const { isLogedIn, data, setData, setIsLogedIn } = useContext(AppContext);
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(data !== null){
      setUsername(data.user.name);
    }
  },[data]);

  return (
    <div className='w-screen min-h-screen flex flex-col items-center'>
      <nav className='w-[90%] h-[80px] mt-4'>
        <div className='w-full h-full flex flex-col items-center gap-1'>
          <div className='w-full flex justify-between items-center'>
            <h2 
              className='text-4xl font-bold text-slate-700 cursor-pointer'
              onClick={() => navigate('/')}
            >TODO LIST</h2>
            {
              isLogedIn ? 
              (
                <div className='flex justify-center items-center gap-4'>
                  <button
                    className='flex justify-center items-center gap-1 text-xl font-semibold text-slate-900 border rounded border-slate-600 px-4 py-1 bg-green-500 hover:bg-green-600 transition duration-300 ease-in'
                  ><FaUserCheck/>{userName}</button>

                  <button
                    className='flex justify-center items-center gap-1 text-xl font-semibold text-slate-900 border rounded border-slate-600 px-4 py-1 bg-green-500 hover:bg-green-600 transition duration-300 ease-in'
                    onClick={() => {
                      setIsLogedIn(false);
                      setData(null);
                    }}
                  ><FiLogOut/>Logout</button>
                </div>
              )
              :
              (
                <button className='flex justify-between items-center gap-1 text-xl font-semibold text-slate-900 border rounded border-slate-600 px-4 py-1 bg-red-500 hover:bg-red-600 transition duration-300 ease-in'
                  onClick={() => navigate('/login')}>
                  <FaUser/> Login
                </button>
              )
            }
          </div>
          <div className='w-full h-[3px] bg-slate-300 border rounded-full'></div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgot-password' element={<ForgotPass/>}/>
        <Route path='/change-password' element={<ChangePass/>}/>
      </Routes>
    </div>
  );
}

export default App;
