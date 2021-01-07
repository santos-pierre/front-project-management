import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TaskType } from '../../../../../types/TaskType';
import { Transition } from '@headlessui/react';
import tasksClient from '../../../../../api/tasks/tasksClient';
import ButtonForm from '../../../../ButtonForm/ButtonForm';
import ButtonSecondary from '../../../../ButtonSecondary/ButtonSecondary';
import InputForm from '../../../../InputForm/InputForm';

type ModalProps = {
    show: boolean;
    tasks: Array<TaskType>;
    task?: TaskType;
    handleVisibility: Function;
    handleTasks: Function;
    edit?: boolean;
    slug: string;
};
type Inputs = {
    body: string;
};

const TaskModal = ({
    show,
    task,
    handleVisibility,
    handleTasks,
    edit,
    tasks,
    slug,
}: ModalProps) => {
    const { handleSubmit, register } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data: object) => {
        if (edit && task) {
            try {
                const response = await tasksClient.updateTask(
                    slug,
                    task.id,
                    data
                );
                handleTasks(
                    tasks.map((element) =>
                        element.id === response.data.id
                            ? response.data
                            : element
                    )
                );
                handleVisibility(false);
            } catch (error) {}
        } else {
            try {
                const response = await tasksClient.createTask(slug, data);
                handleTasks([...tasks, response.data]);
                handleVisibility(false);
            } catch (error) {}
        }
    };

    return (
        <Transition show={show} className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed inset-0 transition-opacity"
                >
                    <div
                        className="absolute inset-0 bg-gray-500 opacity-75"
                        onClick={() => handleVisibility(false)}
                    ></div>
                </Transition.Child>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="text-center sm:mt-5">
                                <div className="flex flex-col space-y-2">
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <InputForm
                                            name="body"
                                            type="text"
                                            placeholder="My awesome task"
                                            ref={register}
                                            defaultValue={task && task.body}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                            <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
                                <ButtonForm
                                    colorClass="bg-primary"
                                    text="Save"
                                />
                            </span>
                            <span
                                className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:col-start-1"
                                onClick={() => handleVisibility(false)}
                            >
                                <ButtonSecondary>Cancel</ButtonSecondary>
                            </span>
                        </div>
                    </form>
                </Transition.Child>
            </div>
        </Transition>
    );
};

export default TaskModal;
