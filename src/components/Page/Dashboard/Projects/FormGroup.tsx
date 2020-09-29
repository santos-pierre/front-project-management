import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import projectsClient from '../../../../api/projects/projectsClient';
import { getRoute } from '../../../../routes/routes';
import { ProjectType } from '../../../../types/ProjectType';

type Inputs = {
    title: string,
    repository_url: string,
    deadline: string,
    description: string,
    status_project_id: number
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
    deadline: {
        pattern: {
            value: /^\d{4}[- / .](((0)[0-9])|((1)[0-2]))[- / .]([0-2][0-9]|(3)[0-1])$/, // YYYY-MM-DD Regex
            message: 'Your deadline is not valid'
        },
    },
}

export default () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newProject, setNewProject] = useState<ProjectType>();
    const [isDone, setIsDone] = useState(false);

    const { register, handleSubmit, errors, setError } = useForm<Inputs>();
    const history = useHistory();

    const onSubmit = async (data: Inputs) => {
        setIsLoading(true);
        data.status_project_id = 2; // Set the project automatically to pending
        try {
            const response = await projectsClient.store(data);
            setNewProject(response.data);
            setIsDone(true);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <div>
                <div>
                    <div className="hidden lg:block">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Create Project
                        </h3>
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">Project Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="title" type="text" required className={`${errors.title && inputStyles.errors} form-input block w-full sm:text-sm sm:leading-5`} placeholder="My awesome project" name="title" ref={register(inputsControls.title)} />
                            </div>
                        </div>
                        {errors.title && <label className="text-red-500 text-sm ml-2">{errors.title.message}</label>}
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="github" className="block text-sm font-medium leading-5 text-gray-700">Github URL</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="github" type="url" className="form-input block w-full sm:text-sm sm:leading-5" placeholder="http://github.com/yourgithub" name="repository_url" ref={register} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="deadline" className="block text-sm font-medium leading-5 text-gray-700">Deadline</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="deadline" type="date" className={`${errors.deadline && inputStyles.errors} form-input block w-full sm:text-sm sm:leading-5`} placeholder="github.com/yourgithub" name="deadline" ref={register(inputsControls.deadline)} />
                            </div>
                            {errors.deadline && <label className="text-red-500 text-sm ml-2">{errors.deadline.message}</label>}
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
                        <button type="submit" disabled={isLoading} className={`w-full flex justify-around py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!isLoading ? 'bg-orange-500' : 'cursor-not-allowed bg-orange-300'} hover:bg-orange-400 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out`}>
                            <span>
                                Create Project
                                <svg className={`animate-spin mr-3 h-5 w-5 text-white inline ml-2 ${isLoading ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </span>
                        </button>
                    </span>
                </div>
            </div>
        </form>
    )
}