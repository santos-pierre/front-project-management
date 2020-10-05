import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import tasksClient from '../../../../../api/tasks/tasksClient';
import { TaskType } from '../../../../../types/TaskType';

export default () => {
    type Param = {
        slug: string
    }
    type Inputs = {
        body: string
    }
    const { slug } = useParams<Param>();
    const [tasks, setTasks] = useState<Array<TaskType>>([]);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const { handleSubmit, register } = useForm<Inputs>();

    const onSubmit = async (data: object) => {
        try {
            const response = await tasksClient.createTask(slug, data);
            setTasks([...tasks, { ...response.data, option: false }]);
            setShowCreateModal(false);
        } catch (error) {

        }
    }

    const updateTask = async (task: TaskType) => {
        try {
            const response = await tasksClient.updateTask(slug, task.id, { ...task, done: !task.done });
            setTasks(tasks.map((element) => element.id === task.id ? { ...response.data, option: false } : element));
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

    const toggleOptionTask = (task: TaskType, value?: boolean) => {
        if (value) {
            setTasks(tasks.map((element) => element.id === task.id ? { ...element, option: value } : element));
        } else {
            setTasks(tasks.map((element) => element.id === task.id ? { ...element, option: !element.option } : element));
        }
    }

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await tasksClient.tasks(slug);
                setTasks(response.data.map((element: TaskType) => ({ ...element, option: false })));
            } catch (error) {
                console.log(error);
            }
        }
        getTasks();
    }, [slug]);

    return (
        <div>
            <div className="lg:mt-6 mt-1 sm:mt-5 px-5 mb-2">
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row xl:flex-col xl:space-x-0 xl:space-y-3">
                        <button type="button" className="inline-block items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600 transition ease-in-out duration-150" onClick={() => setShowCreateModal(true)}>
                            Add Task
                        </button>
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
                                        <button className="text-gray-400 hover:text-gray-500 cursor-pointer focus:outline-none" onClick={() => { toggleOptionTask(element) }} onBlur={() => toggleOptionTask(element, false)}>
                                            <svg className="w-4 h-4 right-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                        </button>
                                        <Transition
                                            show={element.option}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <div className="border border-gray-300 absolute right-3 z-10 bg-white py-1 flex-col space-y-2 w-48 rounded-md shadow-lg" >
                                                <div className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">
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
                                        </Transition>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
            <Transition show={showCreateModal}>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowCreateModal(false)}></div>
                            </div>
                        </Transition.Child>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline" >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <div className="text-center sm:mt-5">
                                        <div className="flex flex-col space-y-2">
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <input id="title" type="text" className={`form-input block w-full sm:text-sm sm:leading-5`} placeholder="My awesome task" name="body" ref={register} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
                                        <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                            Add Task
                                        </button>
                                    </span>
                                    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
                                        <button type="button" className="inline-flex justify-center w-full rounded-md border border-orange-300 px-4 py-2 bg-white text-base leading-6 font-medium text-orange-500 shadow-sm hover:text-orange-500 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5" onClick={() => setShowCreateModal(false)}>
                                            Cancel
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Transition>
        </div >
    )
}