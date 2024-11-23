import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { RootState } from '@/store';
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from 'next/router';
import { BsClipboardData } from "react-icons/bs";
import AddTaskModal from '../components/task/addTaskModal'; 
import TaskCard from '../components/Dashbord/TaskCard';
import Calendar from '../components/Dashbord/Calendar';
import '../app/globals.css';
import { createTaskAction } from '@/store/actions/task/createTaskAction';
import { getTaskAction } from '@/store/actions/task/getTaskAction';
import { updateTaskAction } from '@/store/actions/task/updateTaskAction';
import { deleteTaskAction } from '@/store/actions/task/deleteTaskAction';
import { IoIosAdd } from "react-icons/io";
import Confirmation from '@/components/common/confirmModal/Confirm';
import { logoutAction } from '@/store/actions/auth/logoutAction';
import Pagination from '@/components/common/pagination/pagination';

interface Task {
  _id: string;
  task: string;
  date: string;
  completionStatus: boolean;
}


const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLogout,setLogout]= useState<boolean>(false)
  const [currentPage,setCurrentPage] = useState<number>(1)
  const [totalPages ,setTotalPages] = useState<number>(0)
  const [totalCompletedTask,setCompletedTask] = useState<number>(0)
  const tasksPerPage = 3;

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleUpdate =async (updatedTask: Task) => {
    try{
      const response = await dispatch(updateTaskAction(updatedTask))
      setTasks((prevTasks) =>
        prevTasks.map((task:Task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );

    }catch(error:any){
      console.log(error);
      
    }
  };

  const handleLogout =async ()=>{
    await dispatch(logoutAction())
  }

  
  const handleDelete = async(taskId: string) => {
    try{
      const response = await dispatch(deleteTaskAction({_id:taskId}))
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

    }catch(error:any){
      console.log(error);
      
    }
  };
  useEffect(() => {
    if (!data) {
      router.push('/auth/login');
    }
  }, [data, router]);
  
  useEffect(()=>{
    if(data){
      const getTasks =async () =>{
          const response =await dispatch(getTaskAction({userId:data?._id,page:currentPage,limit:tasksPerPage}))
         
          
          if(response?.payload?.success){
            console.log(response.payload.data.tasks);
            
            setTasks(response.payload.data.tasks)
            setTotalPages(response.payload.data.totalPages)
            setCompletedTask(response.payload.data.totalCompletedTasks)

          }
      }
      getTasks()
    }
  },[dispatch,currentPage])

  const handleAddTask = async (task: { task: string; date: string; completionStatus: boolean }) => {
    console.log(task);
    const response = await dispatch(createTaskAction({...task,userId:data?._id}))
    if(response?.payload.success){
      setTasks([...tasks, { ...response.payload.data }]);

    }
  };

  
  
  return (
    <div className="p-8 bg-gray-100 min-h-screen font-Poppins">
      {/* Header */}
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl text-black">Hello {data?.username}..!</h1>
          <p className="text-gray-600 text-black">Have a nice day.</p>
        </div>
        <div>
          <button onClick={()=>{setLogout(true)}} className="bg-gradient-to-l from-gray-400  to-gray-500 py-2 mr-2 px-4 rounded-lg">
            <small className='flex justify-between items-center'> <IoMdLogOut className='text-sm mr-2' />Log out</small>
          </button>
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
              <BsClipboardData className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-white font-semibold text-2xl">
              {index === 0 ? tasks.length : index === 1 ? 1 : tasks.length - 1}
            </p>
          </div>
        ))}
      </div>

      {/* Tasks and Calendar */}
      <div className="mt-8 flex justify-evenly">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Tasks</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white text-black rounded-full">In-progress</button>
              <button className="px-4 py-2 bg-blue-200 text-gray-600 rounded-full text-sm">
                Completed
              </button>
              <button
                className="px-4 py-2 bg-blue-700 text-white rounded-full text-sm flex items-center justify-evenly"
                onClick={() => setIsModalOpen(true)}
              >
                <IoIosAdd className='mr-1'/>
                Add Task
              </button>
            </div>
          </div>

          {/* Task Cards */}
          {tasks.map((task, index) => (
            <TaskCard
            key={task._id}
            task={task}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
          ))}
        </div>

        {/* Calendar Component */}
        <div className="pl-4">
          <Calendar />
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
      />
      {/* comfirmation */}
      {isLogout&&<Confirmation 
        onCancel={()=>setLogout(false)}
        onConfirm={handleLogout}
        message='Are you sure to logout?'
      
      />}

<Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page:number)=>setCurrentPage(page)}
        />
    </div>
  );
};

export default Dashboard;
