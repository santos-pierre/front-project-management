import React, { useState } from 'react';
import { ProjectType } from '../../../../types/ProjectType';
import moment from 'moment';
import _ from "lodash";
import { Link, useHistory } from 'react-router-dom';
import { getRoute } from '../../../../routes/routes';
import Button from '../../../Button/Button';
import MenuDropdown from '../../../MenuDropdown/MenuDropdown';
import projectsClient from '../../../../api/projects/projectsClient';

type ProjectInfoProps = {
    project: ProjectType
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const history = useHistory();

    const deleteTask = async (project: ProjectType) => {
        try {
            await projectsClient.delete(project.slug);
            history.push(getRoute('dashboard').path);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="pl-4 py-6 pr-4 sm:pl-6 lg:pl-8 xl:pl-0 w-full">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                    <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                        <div className="flex items-center space-x-3">
                            <div className="space-y-1 w-full">
                                <div className="flex text-lg leading-5 font-medium text-gray-900 mb-3 justify-between">
                                    {project?.title}
                                    <div className="flex relative" >
                                        <button className="text-gray-400 hover:text-gray-500 cursor-pointer focus:outline-none" onClick={() => { setShowMenu(!showMenu) }} onBlur={() => setShowMenu(false)}>
                                            <svg className="w-4 h-4 right-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                        </button>
                                        <MenuDropdown show={showMenu}>
                                            <div className="border border-gray-300 absolute right-3 z-10 bg-white py-1 flex-col space-y-2 w-48 rounded-md shadow-lg" >
                                                <div className="cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => deleteTask(project)} role="menuitem">
                                                    <div className="flex items-center justify-between" >
                                                        <span className="text-sm">Delete</span>
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </MenuDropdown>
                                    </div>
                                </div>
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    <div className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{project?.author}</div>
                                </span>
                                {project?.deadline &&
                                    <span className="group flex items-center space-x-2.5 text-gray-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                        <div className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{moment.unix(project?.deadline).format("DD-MM-YYYY")}</div>
                                    </span>
                                }
                                <span className="group flex items-center space-x-2.5 text-gray-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                                    <div className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{_.upperFirst(project?.status).replace('_', ' ')}</div>
                                </span>
                                {project?.description &&
                                    <p className="pr-2 text-sm text-gray-500 font-medium">
                                        {project?.description}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row xl:flex-col xl:space-x-0 xl:space-y-3">
                            <Link to={getRoute('projects-edit', { slug: project?.slug }).path} className="inline-flex rounded-md shadow-sm w-full">
                                <Button addStyle="border-orange-500" type="submit" bgColor="white" bgColorIntensity="500" textColorHover="white" bgColorHover="orange" bgColorHoverIntensity="500" bgColorFocusIntensity="600" textColor="orange" textColorIntensity="500" size="full" textSize="text-sm">
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo;