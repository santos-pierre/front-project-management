import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tasksClient from '../../../../../api/tasks/tasksClient';
import { TaskType } from '../../../../../types/TaskType';
import ButtonSecondary from '../../../../ButtonSecondary/ButtonSecondary';
import Loading from '../../../../Loading/Loading';
import MenuDropdown from '../../../../MenuDropdown/MenuDropdown';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

const IndexTask = () => {
    type Param = {
        slug: string;
    };

    const { slug } = useParams<Param>();
    const [tasks, setTasks] = useState<Array<TaskType>>([]);
    const [taskSelected, setTaskSelected] = useState<TaskType | undefined>();
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleModalVisibility = (show: boolean, task?: TaskType) => {
        setShow(show);
        setTaskSelected(task);
    };

    const updateTask = async (task: TaskType) => {
        try {
            const response = await tasksClient.updateTask(slug, task.id, {
                ...task,
                done: !task.done,
            });
            setTasks(
                tasks.map((element) =>
                    element.id === task.id ? response.data : element
                )
            );
        } catch (error) {}
    };

    const deleteTask = async (task: TaskType) => {
        try {
            const response = await tasksClient.delete(slug, task.id);
            if (response.status === 200) {
                setTasks(tasks.filter((element) => element.id !== task.id));
            }
        } catch (error) {}
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await tasksClient.tasks(slug);
                setTasks(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        getTasks();
    }, [slug]);

    return (
        <div>
            <div className="px-5 mt-1 mb-2 lg:mt-6 sm:mt-5">
                <div className="flex flex-wrap items-center justify-between -mt-2 -ml-4 sm:flex-no-wrap">
                    <div className="mt-2 ml-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Tasks
                        </h3>
                    </div>
                    <div className="flex-shrink-0 mt-2 ml-4">
                        <span
                            className="inline-flex rounded-md outline-none"
                            onClick={() => setShow(true)}
                        >
                            <ButtonSecondary>
                                Add Task
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </ButtonSecondary>
                        </span>
                    </div>
                </div>
            </div>
            <div className="px-4 py-4 lg:py-8 sm:px-6 lg:px-8">
                <nav className="flex">
                    <ul className="w-full space-y-6">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            tasks.map((element) => {
                                return (
                                    <li
                                        key={element.id}
                                        className="flex justify-between"
                                    >
                                        <TaskItem
                                            element={element}
                                            toogleTask={updateTask}
                                        />
                                        <div className="relative flex">
                                            <button
                                                className="text-gray-400 cursor-pointer hover:text-gray-500 focus:outline-none"
                                                onClick={() => {
                                                    setTaskSelected(element);
                                                }}
                                                onBlur={() =>
                                                    setTaskSelected(undefined)
                                                }
                                            >
                                                <svg
                                                    className="right-0 w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                </svg>
                                            </button>
                                            <MenuDropdown
                                                show={
                                                    taskSelected && !show
                                                        ? element.id ===
                                                          taskSelected.id
                                                        : false
                                                }
                                            >
                                                <div className="absolute z-10 flex-col w-48 py-1 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg right-3">
                                                    <div
                                                        className="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                                        role="menuitem"
                                                        onClick={() => {
                                                            handleModalVisibility(
                                                                true,
                                                                element
                                                            );
                                                        }}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">
                                                                Edit
                                                            </span>
                                                            <svg
                                                                className="w-3 h-3"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                                        onClick={() =>
                                                            deleteTask(element)
                                                        }
                                                        role="menuitem"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">
                                                                Delete
                                                            </span>
                                                            <svg
                                                                className="w-3 h-3"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </MenuDropdown>
                                        </div>
                                    </li>
                                );
                            })
                        )}
                        {!isLoading && tasks.length === 0 && (
                            <h1 className="mt-2 text-xl text-center text-gray-300">
                                You don't have any tasks for this project
                            </h1>
                        )}
                    </ul>
                </nav>
            </div>
            <TaskModal
                slug={slug}
                show={show}
                handleVisibility={handleModalVisibility}
                task={taskSelected}
                tasks={tasks}
                handleTasks={setTasks}
                edit={taskSelected ? true : false}
            />
        </div>
    );
};

export default IndexTask;
