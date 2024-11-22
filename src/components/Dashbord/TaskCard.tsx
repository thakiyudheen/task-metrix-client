import { FaTasks } from 'react-icons/fa';
// import { toast } from 'react-toastify';  // Assuming you use toast notifications
// import { formatDate } from 'utils'; // Assuming you have a utility function to format dates

interface Task {
  _id: string;
  task: string;
  date: string;
  completionStatus: boolean;
}

interface TaskCardProps {
  task: Task;
  handleUpdate: (taskId: string) => void;
  handleDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleUpdate, handleDelete }) => {
  return (
    <div key={task?._id} className="bg-white rounded-lg shadow-md p-4 mb-3 flex items-center">
      {/* Task Icon */}
      <div className="bg-gradient-to-l from-blue-500 to-blue-700 p-2 rounded-lg mr-4">
        <FaTasks className="text-white text-xl" />
      </div>

      {/* Task Details */}
      <div className="flex-grow">
        <h3 className="text-gray-800 font-medium">{'task'}</h3>
        <p className="text-gray-500 text-sm">{"jsldskjfls"}</p>
      </div>

      {/* Dropdown Menu */}
      <div className="text-gray-400 text-xl">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">⋮</div>
          {/* <ul tabIndex={0} className="dropdown-content menu absolute bg-gray-100 text-black rounded-box z-[1] w-52 p-2 shadow-lg">
            {task?.completionStatus ? (
              <li >
                <a>Completed</a>
              </li>
            ) : (
              <li onClick={() => handleUpdate(task._id)}>
                <a>Complete</a>
              </li>
            )}
            <li className="text-red-500" onClick={() => handleDelete(task._id)}>
              <a>Delete</a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
