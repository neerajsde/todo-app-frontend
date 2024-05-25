import React, { useContext } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { AppContext } from '../context/AppContext';


const PendingTask = ({ data, setIsActiveEditTask }) => {
  const {deleteTask, setEditTask, setTaskId} = useContext(AppContext);
  function parseDateTime(dateTimeString) {
    try {
      const [datePart, timePart] = dateTimeString.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [timeWithoutMillis, milliseconds] = timePart.split('.');
      const [hour, minute, second] = timeWithoutMillis.split(':').map(Number);
  
      const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  
      // Convert UTC to IST
      const offsetMinutes = 330; // IST is UTC+5:30
      const istDate = new Date(utcDate.getTime() + offsetMinutes * 60 * 1000);
  
      // Format date and time components as strings
      const formattedDate = `${istDate.getUTCFullYear()}-${String(istDate.getUTCMonth() + 1).padStart(2, '0')}-${String(istDate.getUTCDate()).padStart(2, '0')}`;
      const formattedTime = `${String(istDate.getUTCHours()).padStart(2, '0')}:${String(istDate.getUTCMinutes()).padStart(2, '0')}:${String(istDate.getUTCSeconds()).padStart(2, '0')}`;
  
      return { date: formattedDate, time: formattedTime };
    } 
    catch (error) {
      // console.error('Error parsing date:', error);
      return null;
    }
  }     

  return (
    <div className='w-[90%] flex flex-col'>
      <h2 className='text-base text-slate-800 font-bold'>Pending Task</h2>
      <table>
        <tr className='bg-blue-500 border-2 border-slate-800 uppercase'>
            <th className='border-2 border-slate-800'>Serial No.</th>
            <th className='border-2 border-slate-800'>Task Name</th>
            <th className='border-2 border-slate-800'>Date</th>
            <th className='border-2 border-slate-800'>Time</th>
            <th className='border-2 border-slate-800'>Update</th>
        </tr>
        {data && data.user.pendingTask.map((task, index) => {
            const parsedDateTime = parseDateTime(task.createdAt);

            return (
            <tr key={task.id} className='bg-blue-300 border-2 border-slate-800 text-center'>
                <td className='border-2 border-slate-700'>{index + 1}.</td>
                <td className='border-2 border-slate-700'>{task.task}</td>
                <td className='border-2 border-slate-700'>{parsedDateTime.date}</td>
                <td className='border-2 border-slate-700'>{parsedDateTime.time}</td>
                <td className='flex justify-center items-center py-1 gap-2'>
                    <button 
                      className='border-2 flex items-center gap-1 border-slate-500 rounded px-3 text-slate-800 uppercase font-bold'
                      onClick={() =>  {
                        setIsActiveEditTask(true);
                        setEditTask(task.task);
                        setTaskId(task._id);
                      }}
                    >
                        <MdEdit/>Edit
                    </button>
                    <button 
                      className='border-2 flex items-center gap-1 border-slate-500 rounded px-3 text-red-700 uppercase font-bold'
                      onClick={() => deleteTask({
                        id:data.user._id,
                        task_id:task._id
                      })}
                    >
                        <MdDelete/>Delete
                    </button>
                </td>
            </tr>
            );
        })}
      </table>
    </div>
  );
};

export default PendingTask;