import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskType } from '../../../../../types/TaskType';
import { Transition } from '@headlessui/react';
import tasksClient from '../../../../../api/tasks/tasksClient';

type ModalProps = {
    show: boolean,
    tasks: Array<TaskType>,
    task?: TaskType,
    handleVisibility: Function,
    handleTasks: Function,
    edit?: boolean,
    slug: string
}
type Inputs = {
    body: string
}

const TaskModal = ({ show, task, handleVisibility, handleTasks, edit, tasks, slug }: ModalProps) => {
    const { handleSubmit, register } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: object) => {
        if (edit && task) {
            try {
                const response = await tasksClient.updateTask(slug, task.id, data);
                handleTasks(tasks.map((element) => element.id === response.data.id ? response.data : element));
                handleVisibility(false);
            } catch (error) {

            }
        } else {
            try {
                const response = await tasksClient.createTask(slug, data);
                handleTasks([...tasks, response.data]);
                handleVisibility(false);
            } catch (error) {

            }
        }
    }

    return (
        <Transition show={show} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => handleVisibility(false)}></div>
                </Transition.Child>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                    <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="text-center sm:mt-5">
                                <div className="flex flex-col space-y-2">
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input id="title" type="text" className={`form-input block w-full sm:text-sm sm:leading-5`} placeholder="My awesome task" name="body" ref={register} defaultValue={task && task.body} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
                                <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                    Save
                                </button>
                            </span>
                            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
                                <button type="button" className="inline-flex justify-center w-full rounded-md border border-orange-300 px-4 py-2 bg-white text-base leading-6 font-medium text-orange-500 shadow-sm hover:text-orange-500 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5" onClick={() => handleVisibility(false)}>
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </form>
                </Transition.Child>
            </div>
        </Transition>)
}

export default TaskModal;   