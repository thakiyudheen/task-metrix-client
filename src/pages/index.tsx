import TaskCard from '../components/Dashbord/TaskCard';
import Calendar from '../components/Dashbord/Calendar';
import { BsClipboardData } from "react-icons/bs";
import '../app/globals.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserAction } from '@/store/actions/auth/getUserAction';

const Dashboard = () => {
  const tasks = [
    { title: 'Authentication', date: 'Yesterday' },
    { title: 'User management', date: 'Today' },
    { title: 'Dockerize application', date: 'Today' },
  ];
  const dispatch = useAppDispatch()
  const {data} = useAppSelector((state:RootState)=>state.user)
  console.log('this is the user',data );
  

  useEffect(()=>{
    dispatch(getUserAction())
  })

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-Poppins">

    
      {/* Header */}
      <header className='flex justify-between'>
        <div >
        <h1 className="text-2xl  text-black ">Hello Thakeyudheen..!</h1>
        <p className="text-gray-600 text-black ">Have a nice day.</p>
        </div>
        <div >
            <button className='bg-gradient-to-l from-blue-500 to-blue-700 py-2 px-2 rounded-full mr-2 px-2'><small>add Task</small></button>
            <button className='bg-gradient-to-l from-blue-500 to-blue-700 py-2 px-2 rounded-full px-2 '> <small>Log out</small></button>
        </div>
      </header>

      {/* Task Summary */}
      <div className="grid grid-cols-3 gap-6 mt-6">
      {['Total Tasks', 'Today’s Tasks', 'Pending Tasks'].map((title, index) => (
  <div
    key={index}
    className={`${
      index % 2 !== 0
        ? 'bg-gradient-to-l from-blue-500 to-blue-700'
        : 'bg-gradient-to-l from-blue-400 to-blue-400'
    } md:w-full text-purple-100 p-4 rounded-lg shadow`}
  >
    <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      {/* Replace with BsClipboardData icon */}
      <BsClipboardData className="text-white text-2xl" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-white font-semibold text-2xl">
      {index === 0 ? 4 : index === 1 ? 1 : 4}
    </p>
    <div className="w-56"></div>
  </div>
))}
      </div>

      {/* Recent Tasks */}
      <div className="mt-8 flex justify-evenly">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Recent</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-200 rounded-full">In-progress</button>
              <button className="px-4 py-2 bg-blue-200 rounded-full">Completed</button>
            </div>
          </div>

          {/* Map through tasks and display TaskCards */}
          {tasks.map((task, index) => (
            <TaskCard key={index} title={task.title} date={task.date} />
          ))}
        </div>

        {/* Calendar Component */}
        <div className="p-5">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
