import React from "react";
import { IconType } from "react-icons";

interface TaskSummaryCardProps {
    title: string;
    count: number;
    index: number;
    icon: IconType;
    totalTasks: number;
}

const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ title, count, index, icon: Icon, totalTasks }) => {
    const backgroundColor =
        index % 2 === 0
            ? "bg-gradient-to-l from-blue-400 to-blue-600"
            : "bg-gradient-to-l from-blue-500 to-blue-700";

    return (
        <div className={`${backgroundColor} md:w-full min-w-[60%] flex-shrink-0  text-purple-100 p-4 rounded-lg shadow`}>
            <div className="bg-white/20 w-9 h-9 rounded-lg flex items-center justify-center mb-4">
                <Icon className="text-white text-xl" />
            </div>
            <p className="text-white">
                <span className="text-2xl">{count}</span>
                {title !== "Total Tasks" && (
                    <>
                        {" \\ "}
                        <span className="text-xs">
                            {totalTasks} ({((count / totalTasks) * 100).toFixed(1)}%)
                        </span>
                    </>
                )}
            </p>
            <small className="font-semibold text-white">{title}</small>

        </div>
    );
};

export default TaskSummaryCard;
