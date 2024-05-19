import React, { useContext, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

const EditTask = () => {
    const {editTask, setIsActiveEditTask, data, setData, taskId, isLoading, setIsLoading,} = useContext(AppContext);
    const [inputData, setInputData] = useState({
        user_id:data.user._id,
        _id:taskId,
        task:editTask
    });

    console.log(inputData);
    function inputHandler(event){
        setInputData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    const updateTask = async() => {
        try{
            setIsLoading(true);
            const url = 'https://todo-app-backend-l21h.onrender.com/api/v1/editTask';
            console.log('Sending Data: ', inputData);
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            if(!response.ok){
                let errorMessage = 'Failed to Update task';
                try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                const errorText = await response.text();
                errorMessage = errorText || errorMessage;
                }
                console.log("Update Task error:", errorMessage);
                toast.error(errorMessage);
            }
            else{
                const data = await response.json();
                setData(data);
                console.log('Updated Task: ', data.updateTask);
                toast.success('Task updated sucessfully');
            }
            setIsLoading(false);
        }
        catch(err){
            toast.error(err.message);
            console.log(err.message);
        }
    }
  return (
    <div className='w-full h-full absolute top-0 left-0 bg-opacity-25 bg-gray-400 backdrop-blur flex justify-center items-start py-8'>
        <div className='max-w-[500px] w-full flex flex-col justify-center items-center border-2 border-slate-800 rounded-md gap-4 p-4 bg-slate-400'>
            <div className='w-full flex justify-between items-center'>
                <h2 className='text-xl font-bold text-slate-800'>Edit Task</h2>
                <p 
                    className='text-xl font-extrabold text-slate-800 cursor-pointer'
                    onClick={() => setIsActiveEditTask(false)}
                >
                    <IoMdClose/>
                </p>
            </div>
            <div className='w-full'>
                <label className='flex justify-between items-center text-xl'>
                    Task Name
                    <input
                        type='text'
                        name='task'
                        value={inputData.task}
                        onChange={inputHandler}
                        placeholder='Enter new task...'
                        className='w-[70%] text-lg py-1 px-2 outline-none border-2 border-slate-500 rounded focus:border-sky-500'
                    />
                </label>
            </div>

            <button
                className='w-full flex justify-center items-center gap-4 border-2 border-red-500 py-1 text-xl font-bold rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in'
                onClick={() => {
                    updateTask();
                    setIsActiveEditTask(false);
                }}
            >Update Task {
                isLoading ? (<Spinner/>) : (<div></div>)
            }
            </button>
        </div>
    </div>
  )
}

export default EditTask