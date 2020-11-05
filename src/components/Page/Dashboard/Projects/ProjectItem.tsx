import React from 'react';
import { Link } from 'react-router-dom';
import { getRoute } from '../../../../routes/routes';
import { ProjectType } from '../../../../types/ProjectType';
import StatusProject from './StatusProject';
import moment from 'moment';

type ProjectItemProps = {
    project: ProjectType,
    onClick?: Function,
}

const ProjectItem = ({ project, onClick }: ProjectItemProps) => {
    return (<Link to={getRoute('projects-show', { slug: project.slug }).path} key={project.slug} onClick={() => onClick && onClick()}>
        <li className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6 z-auto">
            <div className="flex items-center justify-between space-x-4">
                <div className="min-w-0 space-y-3">
                    <div className="flex items-center space-x-3">
                        <StatusProject status={project.status} />
                        <span className="block">
                            <h2 className="text-sm font-medium leading-5">
                                <span className="absolute inset-0"></span>
                                {project.title}
                            </h2>
                        </span>
                    </div>
                    {project.repository_url &&
                        <span className="relative group flex items-center space-x-2.5">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z" fill="currentcolor" />
                            </svg>
                            <div className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium truncate">
                                {project.repository_url}
                            </div>
                        </span>
                    }

                </div>
                <div className="sm:hidden">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                    <p className="flex text-gray-500 text-sm leading-5 space-x-2 flex-col items-center space-y-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" /></svg>
                        <span>{moment.unix(project.deadline).format("DD-MM-YYYY")}</span>
                    </p>
                </div>
            </div>
        </li>
    </Link>)
}

export default ProjectItem;