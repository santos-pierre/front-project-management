import React, { useEffect, useState } from 'react';
import projectsClient from '../../../../api/projects/projectsClient';
import Loading from '../../../Loading/Loading';
import { ProjectType } from '../../../../types/ProjectType';
import ProjectItem from './ProjectItem';

const IndexProject = () => {
    const defaultArray: Array<ProjectType> = [];
    const [projects, setProjects] = useState<Array<ProjectType>>(defaultArray);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        const hydrateProjects = async () => {
            try {
                const response = await projectsClient.index();

                setProjects(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        hydrateProjects();
    }, []);

    return (
        <React.Fragment>
            <div className="pt-4 pb-4 pl-4 pr-6 border-t border-b border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                <div className="flex items-center">
                    <h1 className="flex-1 text-lg font-medium leading-7">
                        Projects
                    </h1>
                    {/* TODO: Sort Projects */}
                    {/* <div className="relative">
                        <span className="rounded-md shadow-sm">
                            <button id="sort-menu" type="button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" aria-haspopup="true" aria-expanded="false">
                                <svg className="w-5 h-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                </svg>Sort
                                        <svg className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right rounded-md shadow-lg">
                            <div className="bg-white rounded-md shadow-xs">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="sort-menu">
                                    <a href="/5" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Name</a>
                                    <a href="/5" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Date modified</a>
                                    <a href="/5" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Date created</a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <ul className="relative z-0 border-b border-gray-200 divide-y divide-gray-200">
                {isLoading ? (
                    <Loading />
                ) : (
                    projects.map((project) => (
                        <ProjectItem project={project} key={project.slug} />
                    ))
                )}
            </ul>
            {!isLoading && projects.length === 0 && (
                <h1 className="mt-2 text-xl text-center text-gray-300">
                    You don't have any project
                </h1>
            )}
        </React.Fragment>
    );
};

export default IndexProject;
