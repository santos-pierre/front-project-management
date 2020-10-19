import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import projectsClient from '../../../../../api/projects/projectsClient';
import { getRoute } from '../../../../../routes/routes';
import { ProjectType } from '../../../../../types/ProjectType';
import { Transition } from '@headlessui/react';
import { lowerCase } from 'lodash';
import moment from 'moment';

type SearchSectionProps = {
    colorLogo: string,
    placeholderColor: string,
    backgroundInput: string,
    textPlaceholder: string,
    textPlaceholderFocus?: string
}

const SearchSection = ({ colorLogo = 'indigo', placeholderColor = 'gray', backgroundInput = 'indigo', textPlaceholder = 'gray', textPlaceholderFocus = 'gray' }: SearchSectionProps) => {

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

    const setStyleLogoInput = (colorLogo: string) => {
        return `relative text-${colorLogo}-300 focus-within:text-gray-400`;
    }

    const setStyleInput = (placeholderColor: string, backgroundInput: string, textPlaceholder: string, textPlaceholderFocus: string): string => {
        return `block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-${backgroundInput}-400 bg-opacity-25 text-${textPlaceholder}-300 placeholder-${placeholderColor}-300 focus:outline-none focus:bg-white focus:placeholder-${textPlaceholderFocus}-400 focus:text-${textPlaceholderFocus}-900 sm:text-sm transition duration-150 ease-in-out`;
    }

    return (
        <div className="flex-1 flex justify-center lg:justify-end">
            <div className={`fixed inset-0 transition-opacity ${!show && 'hidden'} z-10`} onClick={() => { setShow(false); setSearch(""); }}>
                <div className="absolute inset-0 bg-gray-500 opacity-75 "></div>
            </div>
            <div className="w-full px-2 lg:px-6 z-10">
                <label htmlFor="search" className="sr-only">Search projects</label>
                <div className={`${setStyleLogoInput(colorLogo)} relative`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input id="search" className={setStyleInput(placeholderColor, backgroundInput, textPlaceholder, textPlaceholderFocus)} placeholder="Search projects" type="search" onClick={() => { hydrateProjects(); setShow(true) }} onChange={(e) => { setSearch(e.currentTarget.value) }} value={search} />
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
                                    return (<Link to={getRoute('projects-show', { slug: element.slug }).path} key={element.slug} onClick={() => { setSearch(""); setShow(false) }}>
                                        <li className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
                                            <div className="flex items-center justify-between space-x-4">
                                                <div className="min-w-0 space-y-3">
                                                    <div className="flex items-center space-x-3">
                                                        <span aria-label="Running" className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center">
                                                            <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                                                        </span>
                                                        <span className="block">
                                                            <h2 className="text-sm font-medium leading-5">
                                                                <span className="absolute inset-0"></span>
                                                                {element.title}
                                                            </h2>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="sm:hidden">
                                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                                                    <p className="flex text-gray-500 text-sm leading-5 space-x-2 flex-col items-center space-y-2">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" /></svg>
                                                        <span>{moment.unix(element.deadline).format("DD-MM-YYYY")}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>)
                                } else {
                                    return null;
                                }
                            })}
                            {(searchResult.length === 0 && search) && <h1 className="text-lg text-center text-gray-300 mt-2">You don't have any project with this name</h1>}
                        </ul>
                    </Transition>
                </div>
            </div>
        </div >
    )
}

export default SearchSection;