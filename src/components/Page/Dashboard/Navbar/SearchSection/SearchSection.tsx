import React, { useEffect, useState } from 'react';
import projectsClient from '../../../../../api/projects/projectsClient';
import { ProjectType } from '../../../../../types/ProjectType';
import { Transition } from '@headlessui/react';
import { lowerCase } from 'lodash';
import ProjectItem from '../../Projects/ProjectItem';


const SearchSection = () => {
    const [projects, setProjects] = useState<Array<ProjectType>>([]);
    const [searchResult, setSearchResult] = useState<Array<ProjectType>>([]);
    const [search, setSearch] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);


    useEffect(() => {
        setSearchResult([]);
        if (search.length !== 0) {
            const searchProject = projects.filter((element) => {
                return lowerCase(element.title).includes(lowerCase(search))
            });
            setSearchResult(searchProject);
        }
    }, [search, projects]);

    const hydrateProjects = async () => {
        try {
            const response = await projectsClient.index();
            setProjects(response.data)
        } catch (error) {

        }
    }

    return (
        <div className="flex-1 flex justify-center lg:justify-end">
            <div className={`fixed inset-0 transition-opacity ${!show && 'hidden'} z-10`} onClick={() => { setShow(false); setSearch(""); }}>
                <div className="absolute inset-0 bg-gray-500 opacity-75 "></div>
            </div>
            <div className="w-full px-2 lg:px-6 z-10">
                <label htmlFor="search" className="sr-only">Search projects</label>
                <div className="relative text-teal-200 focus-within:text-gray-400">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input 
                        id="search" 
                        className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-teal-400 bg-opacity-25 text-teal-100 placeholder-teal-200 focus:outline-none focus:bg-white focus:ring-1 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm focus:ring-primary focus:border-primary" 
                        placeholder="Search projects" 
                        type="search" 
                        onClick={() => { hydrateProjects(); setShow(true) }} 
                        onChange={(e) => { setSearch(e.currentTarget.value) }} 
                        value={search} />
                    <Transition
                        show={search.length !== 0 && show}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <ul className={`w-full absolute rounded shadow-sm h-auto bg-white py-2 mt-1 z-10 overflow-y-scroll`} style={{ scrollbarWidth: "none" }}>
                            {searchResult.map((element) => {
                                if (lowerCase(element.title).includes(lowerCase(search))) {
                                    return <ProjectItem project={element} onClick={() => { setSearch(""); setShow(false) }} key={element.slug} />
                                } else {
                                    return null;
                                }
                            })}
                            {(searchResult.length === 0 && search) && <h1 className="text-lg text-center text-gray-300 my-2">You don't have any project with this name</h1>}
                        </ul>
                    </Transition>
                </div>
            </div>
        </div >
    )
}

export default SearchSection;