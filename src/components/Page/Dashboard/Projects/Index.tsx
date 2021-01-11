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
            }
        };
        hydrateProjects();
    }, []);

    return (
        <React.Fragment>
            <div className="pt-4 pb-4 pl-4 pr-6 border-t border-b border-gray-200 dark:border-gray-600 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                <div className="flex items-center">
                    <h1 className="flex-1 text-lg font-medium leading-7">
                        Projects
                    </h1>
                </div>
            </div>
            <ul className="relative z-0 border-b border-gray-200 divide-y divide-gray-200 dark:border-gray-600">
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
