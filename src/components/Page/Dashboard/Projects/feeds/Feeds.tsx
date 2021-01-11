import React, { useEffect, useState } from 'react';
import githubCommitClient from '../../../../../api/githubCommit/githubCommitClient';
import { Listbox, Transition } from '@headlessui/react';
import { ProjectType } from '../../../../../types/ProjectType';
import FeedItem from './FeedItem';
import Loading from '../../../../Loading/Loading';

type FeedsProps = {
    project: ProjectType;
};

type CommitType = {
    message: string;
    url: string;
    name: string;
    date: string;
    email: string;
};

const Feeds = ({ project }: FeedsProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [commits, setCommits] = useState<any>([]);
    const [branches, setBranches] = useState<Array<string>>();
    const [currentBranche, setCurrentBranche] = useState<string>();

    useEffect(() => {
        let path = new URL(project.repository_url).pathname;
        let parameters = path.substring(1).split('/');
        let owner = parameters[0];
        let repo = parameters[1];

        const getCommits = async () => {
            try {
                const response = await githubCommitClient.commitsByBranches(
                    owner,
                    repo
                );
                setCommits(response.data);
                setBranches(Object.keys(response.data));
                setCurrentBranche(Object.keys(response.data).shift());
            } catch (error) {
                if (error.status === 404) {
                    setCommits([]);
                }
            } finally {
                setIsLoading(false);
            }
        };
        getCommits();
    }, [project.repository_url]);

    return (
        <>
            {isLoading && commits.length !== 0 ? (
                <Loading />
            ) : (
                <>
                    {branches && (
                        <Listbox
                            value={currentBranche}
                            onChange={setCurrentBranche}
                        >
                            {({ open }) => (
                                <>
                                    <div className="relative">
                                        <span className="inline-block w-full rounded-md shadow-sm">
                                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left border border-gray-300 rounded-md cursor-default dark:bg-blueGray-600 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                                                <span className="block truncate">
                                                    {currentBranche}
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
                                            </Listbox.Button>
                                        </span>

                                        <Transition
                                            show={open}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                            className="absolute z-10 w-full mt-1 rounded-md shadow-lg"
                                        >
                                            <Listbox.Options
                                                static
                                                className="py-1 overflow-auto text-base leading-6 bg-white rounded-md shadow-xs dark:bg-blueGray-600 max-h-60 focus:outline-none sm:text-sm sm:leading-5"
                                            >
                                                {branches &&
                                                    branches.map((branche) => (
                                                        <Listbox.Option
                                                            key={branche}
                                                            value={branche}
                                                        >
                                                            {({
                                                                selected,
                                                                active,
                                                            }) => (
                                                                <div
                                                                    className={`${
                                                                        active
                                                                            ? 'text-white bg-blue-500'
                                                                            : ''
                                                                    } cursor-default select-none relative py-2 pl-8 pr-4`}
                                                                >
                                                                    <span
                                                                        className={`${
                                                                            selected
                                                                                ? 'font-semibold'
                                                                                : 'font-normal'
                                                                        } block truncate`}
                                                                    >
                                                                        {
                                                                            branche
                                                                        }
                                                                    </span>
                                                                    {selected && (
                                                                        <span
                                                                            className={`${
                                                                                active
                                                                                    ? 'text-white'
                                                                                    : 'text-blue-600'
                                                                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                                                        >
                                                                            <svg
                                                                                className="w-5 h-5"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </svg>
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    )}
                    <div className="flow-root mt-8">
                        <ul>
                            {commits.length === 0 && isLoading && <Loading />}
                            {commits &&
                                currentBranche &&
                                commits[currentBranche].map(
                                    (
                                        commit: CommitType,
                                        index: number,
                                        array: Array<CommitType>
                                    ) => {
                                        return (
                                            <FeedItem
                                                commit={commit}
                                                isLast={
                                                    array.length === index + 1
                                                }
                                            />
                                        );
                                    }
                                )}
                        </ul>
                    </div>
                </>
            )}
            {!isLoading && commits.length === 0 && (
                <h1 className="mt-2 text-base text-center text-gray-300">
                    There is no commit for the repository. Check the repository
                    url, it must be a Github url.
                </h1>
            )}
        </>
    );
};

export default Feeds;
