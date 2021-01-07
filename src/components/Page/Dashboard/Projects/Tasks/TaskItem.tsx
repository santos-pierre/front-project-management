import React from 'react';
import { TaskType } from '../../../../../types/TaskType';

type TaskItemProps = {
    element: TaskType;
    toogleTask: Function;
};

const TaskItem = ({ element, toogleTask }: TaskItemProps) => {
    return (
        <span
            className="cursor-pointer group"
            onClick={() => toogleTask(element)}
        >
            <div className="flex items-start space-x-3">
                <div className="relative flex items-center justify-center flex-shrink-0 w-5 h-5">
                    <svg
                        className={`h-full w-full text-primary ${
                            element.done
                                ? 'text-opacity-100'
                                : 'text-opacity-50'
                        } group-focus:text-primary transition ease-in-out duration-150 group-hover:text-primary`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <p className="text-sm font-semibold leading-5 text-gray-500 transition duration-150 ease-in-out group-hover:text-primary">
                    {element.body}
                </p>
            </div>
        </span>
    );
};

export default TaskItem;
