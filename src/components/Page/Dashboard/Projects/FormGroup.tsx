import React, { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import projectsClient from '../../../../api/projects/projectsClient';
import { getRoute } from '../../../../routes/routes';
import { ProjectType } from '../../../../types/ProjectType';
import { FormGroupProjectProps } from './types';
import Button from './../../../Button/Button';
import moment from 'moment';

type Inputs = {
    title: string,
    repository_url: string,
    deadline: string,
    description: string,
    status_project_id: number,
}

const inputsControls = {
    title: {
        required: {
            value: true,
            message: 'The project name is required'
        },
        maxLength: {
            value: 255,
            message: 'You name cannot exceed 255 characters'
        },
        minLength: {
            value: 4,
            message: 'Your title is too short. (min 4 characters)'
        }
    },
    repository_url: {
        pattern: {
            value: /^([A-Za-z0-9]+@|http(|s):\/\/)(github.com+(:\d+)?)(?::|\/)([\d/\w.-]+?)(\.git)?$/, // YYYY-MM-DD Regex
            message: 'Your repository url is not valid'
        },
    },
    deadline: {
        pattern: {
            value: /^\d{4}[- / .](((0)[0-9])|((1)[0-2]))[- / .]([0-2][0-9]|(3)[0-1])$/, // YYYY-MM-DD Regex
            message: 'Your deadline is not valid'
        },
        validate: {
            after: (value: any) => moment(value).isSameOrAfter(moment().subtract(1, 'day'))
        }
    },
}

const STATUS_PROJECT = {
    done: {
        name: "Done",
        value: 1
    },
    pending: {
        name: "Pending",
        value: 2
    },
    late: {
        name: "Late",
        value: 3
    },
    give_up: {
        name: "Give Up",
        value: 4
    },
}

const defaultProps: FormGroupProjectProps = {
    project: { title: "", author: "1", description: "", repository_url: "", slug: "", deadline: moment().unix(), status: 'pending' },
    edit: false
}

export const FormGroup: FunctionComponent<FormGroupProjectProps> = ({ project = { title: "", author: "1", description: "", repository_url: "", slug: "", deadline: moment().unix(), status: 'pending' }, edit }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newProject, setNewProject] = useState<ProjectType>();
    const [isDone, setIsDone] = useState(false);

    const [show, setShow] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState((STATUS_PROJECT as any)[project.status]);

    const { register, handleSubmit, errors, setError } = useForm<Inputs>({
        defaultValues: {
            title: project.title,
            repository_url: project.repository_url,
            deadline: moment.unix(project.deadline).format("YYYY-MM-DD"),
            description: project.description,
        }
    });

    const history = useHistory();

    const onSubmit = async (data: Inputs) => {
        setIsLoading(true);
        if (selectedStatus) {
            data.status_project_id = selectedStatus.value;
        }
        try {
            if (edit) {
                if (project) {
                    const response = await projectsClient.update(project.slug, data);
                    setNewProject(response.data);
                }
            } else {
                const response = await projectsClient.store(data);
                setNewProject(response.data);
            }
            setIsDone(true);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            error.data.errors.title[0] && setError('title', { message: 'Project name already exist' });
        }
    }

    useEffect(() => {
        if (isDone) {
            history.push(getRoute('projects-show', { slug: newProject?.slug }).path);
        }
    }, [isDone, history, newProject])

    const inputStyles = {
        normal: '',
        errors: 'focus:border-red-300 shadow-outline-red focus:shadow-outline-red border-red-300'
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="lg:pt-5 px-5">
            <div>
                <div>
                    <div className="hidden lg:block">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {!edit ? "Create Project" : "Edit Project"}
                        </h3>
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">Project Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="title" type="text" className={`${errors.title && inputStyles.errors} form-input block w-full sm:text-sm sm:leading-5`} placeholder="My awesome project" name="title" ref={register(inputsControls.title)} />
                            </div>
                        </div>
                        {errors.title && <label className="text-red-500 text-sm ml-2">{errors.title.message}</label>}
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="github" className="block text-sm font-medium leading-5 text-gray-700">Github Repository URL</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="github" type="url" className={`${errors.repository_url && inputStyles.errors} form-input block w-full sm:text-sm sm:leading-5`} placeholder="http://github.com/yourgithub" name="repository_url" ref={register(inputsControls.repository_url)} />
                            </div>
                        </div>
                        {errors.repository_url && <label className="text-red-500 text-sm ml-2">{errors.repository_url.message}</label>}
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="deadline" className="block text-sm font-medium leading-5 text-gray-700">Deadline</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="deadline" type="date" className={`${errors.deadline && inputStyles.errors} form-input block w-full sm:text-sm sm:leading-5`} placeholder="github.com/yourgithub" name="deadline" ref={register(inputsControls.deadline)} />
                            </div>
                            {errors.deadline && <label className="text-red-500 text-sm ml-2">{errors.deadline.message}</label>}
                            {errors.deadline && errors.deadline.type === "after" && <label className="text-red-500 text-sm">Date cannot be before today</label>}

                        </div>
                    </div>
                    {/* Status Select */}
                    <div className="space-y-1 mt-6 sm:mt-5">
                        <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
                            Status
                        </label>
                        <div className="relative">
                            <span className="inline-block w-full rounded-md shadow-sm" onClick={() => setShow(!show)}>
                                <button type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className={`"cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue ${show && 'focus:border-blue-300'} transition ease-in-out duration-150 sm:text-sm sm:leading-5"`}>
                                    <span className="block truncate">
                                        {selectedStatus.name}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </button>
                            </span>
                            <div className={`absolute mt-1 w-full rounded-md bg-white shadow-lg ${show ? 'block' : 'hidden'}`}>
                                <ul className="max-h-60 rounded-md text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5" onMouseLeave={() => setShow(false)} >
                                    {Object.entries(STATUS_PROJECT).map((element) => {
                                        return (
                                            <li key={element[1].value} className={`group  cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-orange-500 ${selectedStatus?.name === element[1].name ? 'font-bold bg-orange-500 text-white' : 'font-normal text-gray-900'}`} onClick={() => { setSelectedStatus(element[1]); setShow(false) }}>
                                                <span className="block truncate">
                                                    {element[1].name}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700">Description</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <textarea id="about" rows={3} className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" name="description" ref={register}></textarea>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Write a few sentences to describe your project.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-3" >
                    <span className="block w-full rounded-md shadow-sm">
                        <Button type="submit" bgColor="orange" bgColorIntensity="500" bgColorHoverIntensity="400" bgColorFocusIntensity="600" textColor="white" textColorIntensity="600" size="full" textSize="text-sm" isLoading={isLoading} disabled={isLoading}>
                            {!edit ? "Create Project" : "Edit Project"}
                        </Button>
                    </span>
                </div>
            </div>
        </form >
    )
}


FormGroup.defaultProps = defaultProps;

export default FormGroup;