import React, { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import projectsClient from '../../../../api/projects/projectsClient';
import { getRoute } from '../../../../routes/routes';
import { ProjectType } from '../../../../types/ProjectType';
import { FormGroupProjectProps } from './types';
import moment from 'moment';
import InputForm from '../../../InputForm/InputForm';
import ButtonForm from '../../../ButtonForm/ButtonForm';

type Inputs = {
    title: string;
    repository_url: string;
    deadline: string;
    description: string;
    status_project_id: number;
};

const inputsControls = {
    title: {
        required: {
            value: true,
            message: 'The project name is required',
        },
        maxLength: {
            value: 255,
            message: 'You name cannot exceed 255 characters',
        },
        minLength: {
            value: 4,
            message: 'Your title is too short. (min 4 characters)',
        },
    },
    repository_url: {
        pattern: {
            value: /^([A-Za-z0-9]+@|http(|s):\/\/)(github.com+(:\d+)?)(?::|\/)([\d/\w.-]+?)(\.git)?$/, // YYYY-MM-DD Regex
            message: 'Your repository url is not valid',
        },
    },
    deadline: {
        required: {
            value: true,
            message: 'The deadline is required',
        },
        pattern: {
            value: /^\d{4}[- / .](((0)[0-9])|((1)[0-2]))[- / .]([0-2][0-9]|(3)[0-1])$/, // YYYY-MM-DD Regex
            message: 'Your deadline is not valid',
        },
        validate: {
            after: (value: any) =>
                moment(value).isSameOrAfter(moment().subtract(1, 'day')),
        },
    },
};

const STATUS_PROJECT = {
    done: {
        name: 'Done',
        value: 1,
    },
    pending: {
        name: 'Pending',
        value: 2,
    },
    late: {
        name: 'Late',
        value: 3,
    },
    give_up: {
        name: 'Give Up',
        value: 4,
    },
};

const defaultProps: FormGroupProjectProps = {
    project: {
        title: '',
        author: '1',
        description: '',
        repository_url: '',
        slug: '',
        deadline: moment().unix(),
        status: 'pending',
    },
    edit: false,
};

export const FormGroup: FunctionComponent<FormGroupProjectProps> = ({
    project = {
        title: '',
        author: '1',
        description: '',
        repository_url: '',
        slug: '',
        deadline: moment().unix(),
        status: 'pending',
    },
    edit,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newProject, setNewProject] = useState<ProjectType>();
    const [isDone, setIsDone] = useState(false);

    const [show, setShow] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(
        (STATUS_PROJECT as any)[project.status]
    );

    const { register, handleSubmit, errors, setError } = useForm<Inputs>({
        defaultValues: {
            title: project.title,
            repository_url: project.repository_url,
            deadline: moment.unix(project.deadline).format('YYYY-MM-DD'),
            description: project.description,
        },
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
                    const response = await projectsClient.update(
                        project.slug,
                        data
                    );
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
            error.data.errors.title[0] &&
                setError('title', { message: 'Project name already exist' });
        }
    };

    useEffect(() => {
        if (isDone) {
            history.push(
                getRoute('projects-show', { slug: newProject?.slug }).path
            );
        }
    }, [isDone, history, newProject]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="px-5 lg:pt-5">
            <div>
                <div>
                    <div className="flex mt-3">
                        {edit && (
                            <Link
                                to={
                                    getRoute('projects-show', {
                                        slug: project.slug,
                                    }).path
                                }
                            >
                                <span className="inline-flex items-center text-xs font-semibold text-primary hover:text-opacity-70">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Return to project
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <InputForm
                            name="title"
                            placeholder="My awesome project"
                            type="text"
                            label="Project Name"
                            ref={register(inputsControls.title)}
                            error={errors.title && errors.title.message}
                        />
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <InputForm
                            name="repository_url"
                            placeholder="http://github.com/yourgithub"
                            type="url"
                            label="Github Repository URL"
                            ref={register(inputsControls.repository_url)}
                            error={
                                errors.repository_url &&
                                errors.repository_url.message
                            }
                        />
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <InputForm
                            name="deadline"
                            placeholder="http://github.com/yourgithub"
                            type="date"
                            label="Deadline"
                            ref={register(inputsControls.deadline)}
                            error={
                                errors.deadline
                                    ? errors.deadline.type === 'after'
                                        ? 'Cannot be set to before today'
                                        : errors.deadline.message
                                    : ''
                            }
                        />
                    </div>
                    {/* Status Select */}
                    <div className="mt-6 space-y-1 sm:mt-5">
                        <label
                            id="listbox-label"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Status
                        </label>
                        <div className="relative">
                            <span
                                className="inline-block w-full rounded-md shadow-sm"
                                onClick={() => setShow(!show)}
                            >
                                <button
                                    type="button"
                                    aria-haspopup="listbox"
                                    aria-expanded="true"
                                    aria-labelledby="listbox-label"
                                    className={`"cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue ${
                                        show && 'focus:border-blue-300'
                                    } transition ease-in-out duration-150 sm:text-sm sm:leading-5"`}
                                >
                                    <span className="block truncate">
                                        {selectedStatus.name}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path
                                                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </span>
                            <div
                                className={`absolute mt-1 w-full rounded-md bg-white shadow-lg ${
                                    show ? 'block' : 'hidden'
                                }`}
                            >
                                <ul
                                    className="overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
                                    onMouseLeave={() => setShow(false)}
                                >
                                    {Object.entries(STATUS_PROJECT).map(
                                        (element) => {
                                            return (
                                                <li
                                                    key={element[1].value}
                                                    className={`group antialiased cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-primary ${
                                                        selectedStatus?.name ===
                                                        element[1].name
                                                            ? 'font-bold bg-primary text-white'
                                                            : 'font-normal text-gray-900'
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedStatus(
                                                            element[1]
                                                        );
                                                        setShow(false);
                                                    }}
                                                >
                                                    <span className="block truncate">
                                                        {element[1].name}
                                                    </span>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-5">
                        <div className="flex flex-col space-y-2">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-5 text-gray-700"
                            >
                                Description
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <textarea
                                    id="about"
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-10"
                                    name="description"
                                    ref={register}
                                ></textarea>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Write a few sentences to describe your project.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <span className="block w-full rounded-md shadow-sm">
                        <ButtonForm
                            isLoading={isLoading}
                            colorClass="bg-primary"
                            text={!edit ? 'Create Project' : 'Edit Project'}
                        />
                    </span>
                </div>
            </div>
        </form>
    );
};

FormGroup.defaultProps = defaultProps;

export default FormGroup;
