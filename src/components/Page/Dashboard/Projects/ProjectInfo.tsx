import React, { useState } from 'react';
import { ProjectType } from '../../../../types/ProjectType';
import moment from 'moment';
import { upperFirst } from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import { getRoute } from '../../../../routes/routes';
import MenuDropdown from '../../../MenuDropdown/MenuDropdown';
import projectsClient from '../../../../api/projects/projectsClient';

type ProjectInfoProps = {
    project: ProjectType;
};

const ProjectInfo = ({ project }: ProjectInfoProps) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const history = useHistory();

    const deleteTask = async (project: ProjectType) => {
        try {
            await projectsClient.delete(project.slug);
            history.push(getRoute('dashboard').path);
        } catch (error) {}
    };

    return (
        <div className="w-full py-6 pl-4 pr-4 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                    <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-full space-y-1">
                                <div className="flex justify-between mb-3 text-lg font-medium leading-5 text-gray-900">
                                    {project.title}
                                    <div className="relative flex">
                                        <button
                                            className="text-gray-400 cursor-pointer hover:text-gray-500 focus:outline-none"
                                            onClick={() => {
                                                setShowMenu(!showMenu);
                                            }}
                                            onBlur={() => setShowMenu(false)}
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
                                        <MenuDropdown show={showMenu}>
                                            <div className="absolute z-10 flex-col w-48 py-1 space-y-2 bg-white border border-gray-300 rounded-md shadow-lg right-3">
                                                <div
                                                    className="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    <Link
                                                        to={
                                                            getRoute(
                                                                'projects-edit',
                                                                {
                                                                    slug:
                                                                        project.slug,
                                                                }
                                                            ).path
                                                        }
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">
                                                                Edit
                                                            </span>
                                                            <svg
                                                                className="w-3 h-3"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div
                                                    className="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                                    onClick={() =>
                                                        deleteTask(project)
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
                                </div>
                                <a
                                    href={project.repository_url}
                                    target="_blanck"
                                    className="group flex items-center space-x-2.5 text-gray-500 "
                                >
                                    <svg
                                        className="w-4 h-4 text-gray-400 group-hover:text-gray-500"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
                                            fill="currentcolor"
                                        />
                                    </svg>
                                    <div
                                        className="w-64 text-sm font-medium leading-5 text-gray-500 truncate group-hover:text-gray-900 lg:w-40"
                                        title={project.repository_url}
                                    >
                                        {project.repository_url}
                                    </div>
                                </a>
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                    <div className="text-sm font-medium leading-5 text-gray-500 group-hover:text-gray-900">
                                        {project.author}
                                    </div>
                                </span>
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div className="text-sm font-medium leading-5 text-gray-500 group-hover:text-gray-900">
                                        {project.deadline
                                            ? moment
                                                  .unix(project.deadline)
                                                  .format('DD-MM-YYYY')
                                            : 'DD-MM-YYYY'}
                                    </div>
                                </span>
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    <div className="text-sm font-medium leading-5 text-gray-500 group-hover:text-gray-900">
                                        {upperFirst(project.status).replace(
                                            '_',
                                            ' '
                                        )}
                                    </div>
                                </span>
                                {project.description && (
                                    <p className="pr-2 text-sm font-medium text-gray-500">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row xl:flex-col xl:space-x-0 xl:space-y-3">
                            <Link
                                to={
                                    getRoute('projects-edit', {
                                        slug: project?.slug,
                                    }).path
                                }
                                className="inline-flex w-full rounded-md shadow-sm"
                            >
                                {/* <Button addStyle="border-orange-500" type="submit" bgColor="white" bgColorIntensity="500" textColorHover="white" bgColorHover="orange" bgColorHoverIntensity="500" bgColorFocusIntensity="600" textColor="orange" textColorIntensity="500" size="full" textSize="text-sm">
                                    Edit
                                </Button> */}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfo;
