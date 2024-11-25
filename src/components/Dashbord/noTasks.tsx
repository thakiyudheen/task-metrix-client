import React from 'react';
import { MdOutlineHourglassEmpty } from 'react-icons/md';

interface NoTasksComponentProps {
  message?: string;
}

const NoTasksComponent: React.FC<NoTasksComponentProps> = ({
  message = "No tasks available!",
}) => {
  return (
    <div className="group flex flex-col md:flex-row items-center w-full rounded-lg justify-evenly md:h-[90%] h-[100%] relative md:bg-white">
      <div className="flex items-center justify-center w-full md:w-1/2 h-full md:p-0 p-5">
        <img
          src={'\time.avg'}
          alt="No tasks"
          className="w-3/4 md:w-[70%] object-contain"
        />
      </div>

      <div className="absolute inset-0 bg-gray-600 bg-opacity-50 rounded-lg opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>  
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-full text-center p-4">
        <MdOutlineHourglassEmpty className="text-gray-300 text-6xl mb-1" />
        <p className="text-gray-400 text-sm md:text-sm mb-4">{message}</p>
      </div>
    </div>
  );
};

export default NoTasksComponent;
