import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tasksClient from '../../../../../api/tasks/tasksClient';
import { TaskType } from '../../../../../types/TaskType';
import MenuDropdown from '../../../../MenuDropdown/MenuDropdown';
import TaskModal from './TaskModal';

export default () => {
    type Param = {
        slug: string
    }

    const { slug } = useParams<Param>();
    const [tasks, setTasks] = useState<Array<TaskType>>([]);
    const [taskSelected, setTaskSelected] = useState<TaskType | undefined>();
    const [show, setShow] = useState<boolean>(false);

    const handleModalVisibility = (show: boolean, task?: TaskType) => {
        setShow(show);
        setTaskSelected(task);
    }

    const updateTask = async (task: TaskType) => {
        try {
            const response = await tasksClient.updateTask(slug, task.id, { ...task, done: !task.done });
            setTasks(tasks.map((element) => element.id === task.id ? response.data : element));
        } catch (error) {

        }
    }

    const deleteTask = async (task: TaskType) => {
        try {
            const response = await tasksClient.delete(slug, task.id);
            if (response.status === 200) {
                setTasks(tasks.filter((element) => element.id !== task.id));
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await tasksClient.tasks(slug);
                setTasks(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTasks();
    }, [slug]);

    return (
        <div>
            <div className="lg:mt-6 mt-1 sm:mt-5 px-5 mb-2">
                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
                    <div className="ml-4 mt-2">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Tasks
                        </h3>
                    </div>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <span className="inline-flex rounded-md outline-none">
                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-orange-500 hover:text-orange-600 hover:border-orange-500 focus:outline-none focus:border-orange-500 active:bg-orange-500 active:opacity-75 active:text-white transition ease-in-out duration-150 outline-none" onClick={() => setShow(true)}>
                                Add Task
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="lg:py-8 py-4 px-4 sm:px-6 lg:px-8">
                <nav className="flex">
                    <ul className="space-y-6 w-full">
                        {tasks.map((element) => {
                            return (
                                <li key={element.id} className="flex justify-between">
                                    <span className="group cursor-pointer" onClick={() => updateTask(element)}>
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 relative h-5 w-5 flex items-center justify-center">
                                                <svg className={`h-full w-full ${element.done ? 'text-orange-500 group-hover:text-orange-600' : 'text-orange-300 group-hover:text-orange-500'} group-focus:text-orange-800 transition ease-in-out duration-150`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-900 group-focus:text-gray-900 transition ease-in-out duration-150">{element.body}</p>
                                        </div>
                                    </span>
                                    <div className="flex relative"  >
                                        <button className="text-gray-400 hover:text-gray-500 cursor-pointer focus:outline-none" onClick={() => { setTaskSelected(element) }} onBlur={() => setTaskSelected(undefined)}>
                                            <svg className="w-4 h-4 right-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                        </button>
                                        <MenuDropdown show={taskSelected && !show ? element.id === taskSelected.id : false}>
                                            <div className="border border-gray-300 absolute right-3 z-10 bg-white py-1 flex-col space-y-2 w-48 rounded-md shadow-lg" >
                                                <div className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem"
                                                    onClick={() => { handleModalVisibility(true, element) }}>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm">Edit</span>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                                                    </div>
                                                </div>
                                                <div className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => deleteTask(element)} role="menuitem">
                                                    <div className="flex items-center justify-between" >
                                                        <span className="text-sm">Delete</span>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </MenuDropdown>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
            <TaskModal slug={slug} show={show} handleVisibility={handleModalVisibility} task={taskSelected} tasks={tasks} handleTasks={setTasks} edit={taskSelected ? true : false} />
        </div >
    )
}