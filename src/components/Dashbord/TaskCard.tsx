import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import TaskModal from "../task/addTaskModal";
import { getTaskDateMessage } from "@/helper/getDate";
import { formatDateForInput } from "@/helper/formatDate";
import { CiMenuKebab } from "react-icons/ci";
import { SiTicktick } from "react-icons/si";

interface Task {
  _id: string;
  task: string;
  date: string;
  completionStatus: boolean;
}

interface TaskCardProps {
  task: Task;
  handleUpdate: (task: Task) => void;
  handleDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  handleUpdate,
  handleDelete,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const closeDropdown = () => setDropdownOpen(false);

  const openEditModal = () => {
    setCurrentTask(task);
    closeDropdown();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTask(null);
  };

  const saveTask = (updatedTask: Task |any) => {
    handleUpdate(updatedTask);
    setModalOpen(false);
  };

  return (
    <>
      {/* Task Card */}
      <div
        key={task?._id}
        className="bg-white rounded-lg shadow-md p-4 mb-3 flex items-center"
      >
        {/* Task Icon */}
        <div className="bg-gradient-to-l from-blue-500 to-blue-700 p-2 rounded-lg mr-4">
          <FaTasks className="text-white text-xl" />
        </div>

        {/* Task Details */}
        <div className="flex-grow">
          <h3 className="text-gray-800 font-medium">{task.task}</h3>
          <p className="text-gray-500 text-sm">
            {getTaskDateMessage(task.date)}
          </p>
        </div>

        {/* Dropdown Menu */}
        <div className="relative text-gray-400 text-xl">
          <div
            tabIndex={0}
            role="button"
            className="m-1 cursor-pointer flex justify-evenly items-start"
            onClick={toggleDropdown}
          >
            {task.completionStatus&&<SiTicktick className="mr-2 text-sm text-[green]"/>}
            <CiMenuKebab className="ml-2 text-sm" />
          </div>

          {isDropdownOpen && (
            <ul
              className="absolute right-0 top-8 bg-white text-gray-800 rounded-md shadow-lg z-10 w-40"
              onMouseLeave={closeDropdown}
            >
              {task.completionStatus ? (
                <li className="px-4 py-2 text-green-500"> <small>Completed</small> </li>
              ) : (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleUpdate({ ...task, completionStatus: true });
                    closeDropdown();
                  }}
                >
                  <small>Mark Complete</small> 
                </li>
              )}
              {!task.completionStatus&&<li
                className="px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
                onClick={openEditModal}
              >
                <small>Edit</small>
              </li>}
              <li
                className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleDelete(task._id);
                  closeDropdown();
                }}
              >
               <small>Delete</small> 
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Edit Task Modal */}
      {isModalOpen && currentTask && (
        <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveTask}
        initialTask={{
          ...currentTask,
          date: currentTask?.date ? formatDateForInput(currentTask.date) : "",
        }}
        isEditMode={true}
      />
      )}
    </>
  );
};

export default TaskCard;
