import React from 'react';

const CompletedTask = ({data}) => {
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
    <h2 className='text-base text-slate-800 font-bold'>Completed Task</h2>
    <table>
      <tr className='border-2 border-slate-800 uppercase bg-green-500'>
        <th className='border-2 border-slate-800'>Serial No.</th>
        <th className='border-2 border-slate-800'>Task Name</th>
        <th className='border-2 border-slate-800'>Date</th>
        <th className='border-2 border-slate-800'>Time</th>
      </tr>
      {data && data.user.completedTask.map((task, index) => {
          const parsedDateTime = parseDateTime(task.doneAt);

          return (
            <tr key={task.id} className='bg-green-300 border-2 border-slate-800 text-center'>
              <td className='border-2 border-slate-700'>{index + 1}.</td>
              <td className='border-2 border-slate-700'>{task.task}</td>
              <td className='border-2 border-slate-700'>{parsedDateTime.date}</td>
              <td className='border-2 border-slate-700'>{parsedDateTime.time}</td>
            </tr>
          );
      })}
    </table>
  </div>
  );
}

export default CompletedTask