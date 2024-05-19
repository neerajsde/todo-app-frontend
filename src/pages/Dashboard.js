import React, { useContext, useEffect, useState } from 'react'
import PendingTask from '../components/PendingTask';
import CompletedTask from '../components/CompletedTask';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import EditTask from '../components/EditTask';
import { IoMdAddCircleOutline } from "react-icons/io";

const Dashboard = () => {
  const navigate = useNavigate();
  const {data, setData, isLogedIn, isLoading, setIsLoading, isActiveEditTask, setIsActiveEditTask} = useContext(AppContext);
  const [newTask, setNewTask] = useState({
    id:'',
    task:""
  });

  useEffect(() => {
    if(data){
      setNewTask(prevData => ({
        ...prevData,
        id:data.user._id
      }))
    }
  },[data]);

  function inputHandler(event) {
    const { name, value } = event.target; // Destructure name and value from event.target
    setNewTask(prevData => ({
      ...prevData,
      [name]: value // Update the state property based on input field name
    }));
  }  

  const createTask = async () => {
    try{
      setIsLoading(true);
      const url = `https://todo-app-backend-l21h.onrender.com/api/v1/pendingTask/add`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      if(!response.ok){
        let errorMessage = 'Failed to added task';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        toast.error(errorMessage);
      }

      const res_data = await response.json();
      console.log(res_data);
      setData(prevData => ({
        ...prevData,
        user: {
          ...prevData.user,
          pendingTask: res_data.user.pendingTask
        }
      }));    
      // clear input text field  
      setNewTask({
        ...newTask,
        task: ''
      });
      toast.success('New task added Sucessfully');
      setIsLoading(false);
    }
    catch(err){
      toast.error(err.message);
    }
  }


  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 py-4 relative">

      {
        isActiveEditTask &&
        (
          <EditTask/>
        )
      }

      <div className='w-[90%] flex justify-between items-center gap-2'>
        <input 
          type='text' 
          placeholder='add new task...'
          name='task'
          value={newTask.task}
          onChange={inputHandler}
          className='w-full h-[40px] text-lg font-semibold text-slate-500 border-2 border-slate-500 rounded px-4 py-2 focus:border-slate-800'
        />
        {
          isLogedIn ? 
          (
            <button
              className='w-[150px] h-[40px] flex justify-center items-center gap-3 bg-slate-600 text-white text-lg font-semibold rounded'
              onClick={() => createTask()}
            >Add {
              isLoading ? (<Spinner/>) : (<IoMdAddCircleOutline className='text-xl font-bold'/>)
            }</button>
          ) : 
          (
            <button
              className='w-[150px] h-[40px] bg-slate-600 text-white text-lg font-semibold rounded'
              onClick={() => navigate('/signup')}
            >Sign up</button>
          )
        }
      </div>

      <PendingTask data={data} setIsActiveEditTask={setIsActiveEditTask}/>

      <CompletedTask data={data}/>
    </div>
  )
}

export default Dashboard