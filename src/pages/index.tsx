import { useState, useEffect, useRef } from 'react';
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
import TaskSummaryCard from '@/components/Dashbord/taskSummaryCard';
import { MdOutlinePendingActions } from "react-icons/md";
import { PiGraphBold } from "react-icons/pi";
import LoadingIndicator from '@/components/common/loding/loadingIndicator';
import NoTasksComponent from '@/components/Dashbord/noTasks';

interface Task {
  _id: string;
  task: string;
  date: string;
  completionStatus: boolean;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'completed' | 'in-progress' | 'all'>('all');
  const [isLogout, setLogout] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false)
  const [taskCount, setTaksCount] = useState<number>(0)
  const [completedTasks, setCompletedTasks] = useState<number>(0)
  const tasksPerPage = 3;

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleFilterChange = (status: 'completed' | 'in-progress' | 'all') => {
    setFilter((prevFilter) => (prevFilter === status ? 'all' : status));
  };

  const getPaginatedTasks = (taskList: Task[]) => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return taskList.slice(startIndex, endIndex);
  };

  const handleUpdate = async (updatedTask: Task) => {
    try {
      console.log('thsi si working ',updatedTask);
      
      
      setLoading(true)
      await dispatch(updateTaskAction(updatedTask));
      if(updatedTask.completionStatus){
        setCompletedTasks((pre)=>pre+1)
      }
      setTasks((prevTasks) =>
        prevTasks.map((task: Task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task: Task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error);
    }
  };

  const handleLogout = async () => {

    setLoading(true)
    await dispatch(logoutAction());
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  };

  const handleDelete = async (taskId: string) => {
    try {
      setLoading(true)
      filteredTasks.forEach((el:Task)=>{
        if(el._id==taskId&&el.completionStatus){
          setCompletedTasks((pre)=>pre-1)
        }
      })
      setTaksCount((pre)=>pre-1)
      await dispatch(deleteTaskAction({ _id: taskId }));
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setFilteredTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    if (!data) {
      router.push('/auth/login');
    }
    // if (!localStorage.getItem('jwtToken')) {
    //   router.push('/auth/login');
    // }
  }, [data, router]);

  useEffect(() => {
    if (data) {
      const getTasks = async () => {
        setLoading(true)
        const response = await dispatch(
          getTaskAction({ userId: data?._id, page: currentPage, limit: tasksPerPage })
        );
        if (response?.payload?.success) {

          console.log(response.payload.data);
          setCompletedTasks(response.payload.data.totalCompletedTasks)
          setTaksCount(response.payload.data.totalTasks)
          setTasks(response.payload.data.tasks);
          setTotalPages(response.payload.data.totalPages);
          setFilteredTasks(response.payload.data.tasks)
        }
        setLoading(false)
      };
      getTasks();
    }
  }, [dispatch, currentPage, data]);

  useEffect(() => {
    setLoading(true);
    
    const getTasks = async () => {
      
      const response = await dispatch(
        getTaskAction({
          userId: data?._id || " ",
          page: currentPage,
          limit: tasksPerPage,
          completionStatus: filter === 'completed' ? true : filter === 'in-progress' ? false : undefined
        })
      );
      
      
      if (response?.payload?.success) {
        setFilteredTasks(response?.payload?.data?.tasks);
      }
  
      setLoading(false);
    };
  
    getTasks();
  }, [filter, currentPage, tasksPerPage, data?._id, dispatch]);

  const handleAddTask = async (task: { task: string; date: string; completionStatus: boolean }) => {
    setLoading(true)
    const response = await dispatch(createTaskAction({ ...task, userId: data?._id ,page:currentPage,limit:tasksPerPage},));
    console.log(response);

    if (response?.payload?.success) {
      setTaksCount((pre)=>pre+1)
      console.log('its updated user',response?.payload?.data);
      setTasks(response?.payload?.data)
      setFilteredTasks(response?.payload?.data)
    }
    setLoading(false)
  };

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((task) => !task.completionStatus).length;


  const taskCards = [
    { title: "Total Tasks", count: taskCount, icon: BsClipboardData },
    { title: "Completed Tasks", count: completedTasks, icon: PiGraphBold },
    { title: "In-progress Tasks", count: taskCount - completedTasks, icon: MdOutlinePendingActions },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);


  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const width = containerRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    }
  };


  const scrollToCard = (index: number) => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-Poppins">
      {isLoading && <LoadingIndicator />}
      {/* Header */}
      <header className="flex justify-between md:flex-row flex-col ">
        <div className='md:order-1 order-2'>
          <h1 className="text-2xl text-black">Hello {data?.username}..!</h1>
          <p className="text-gray-600 text-black">Have a nice day.</p>
        </div>
        <div className='md:order-2 order-1'>
          <button
            onClick={() => {
              setLogout(true);
            }}
            className="bg-gradient-to-l from-gray-400 to-gray-500 py-2 mr-2 px-4 rounded-lg md:static relative left-[70%] mb-5 md:mb-0"
          >
            <small className="flex justify-between items-center">
              <IoMdLogOut className="text-sm mr-2" />
              Log out
            </small>
          </button>
        </div>
      </header>

      {/* Task  */}
      <div
        ref={containerRef}
        className="md:grid grid-cols-3 gap-6 mt-6 md:overflow-x-hidden no-scrollbar flex overflow-x-scroll snap-x snap-mandatory"
        onScroll={handleScroll}
      >
        {taskCards.map((card, index) => (
          <TaskSummaryCard
            key={index}
            title={card.title}
            count={card.count}
            totalTasks={taskCount}
            index={index}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Scroll Dots */}
      <div className="flex justify-center mt-4 space-x-2 md:hidden">
        {Array(taskCards.length - 1).fill(null).map((_, index) => (
          <button
            key={index}
            className={` rounded-full ${index === activeIndex ? "bg-[blue] w-6 h-2" : "w-3 h-2 bg-gray-300"
              }`}
            onClick={() => scrollToCard(index)}
          />
        ))}
      </div>

      {/* Tasks and Calendar */}
      <div className="mt-8 flex justify-evenly">
        <div className="flex flex-col w-full">
          <div className="flex justify-between md:items-center md:flex-row flex-col mb-4">
            <h2 className="text-xl font-bold text-black hidden md:block">Tasks</h2>
            <div className="flex md:space-x-2">
              <button
                className={`px-4 py-2 ${filter === 'in-progress' ? 'bg-blue-300 text-white' : 'bg-white text-black'
                  } rounded-full text-sm`}
                onClick={() => handleFilterChange('in-progress')}
              >
                In-progress
              </button>
              <button
                className={`px-4 py-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                  } rounded-full text-sm`}
                onClick={() => handleFilterChange('completed')}
              >
                Completed
              </button>
              <button
                className="px-4 py-2 bg-blue-700 text-white rounded-full text-sm flex items-center justify-evenly"
                onClick={() => setIsModalOpen(true)}
              >
                <IoIosAdd className="mr-1" />
                Add Task
              </button>
            </div>
            <h2 className="text-xl font-bold text-black md:hidden mx-2 my-3">Tasks</h2>
          </div>

        
          {taskCount === 0 ? (
            
            <NoTasksComponent/>

          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))
          )}
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

      {/* Confirmation */}
      {isLogout && (
        <Confirmation
          onCancel={() => setLogout(false)}
          onConfirm={handleLogout}
          message="Are you sure to logout?"
        />
      )}

      {<Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />}
    </div>
  );
};

export default Dashboard;
