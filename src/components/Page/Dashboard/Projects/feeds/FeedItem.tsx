import React from 'react';

type CommitType = {
    message: string;
    url: string;
    name: string;
    date: string;
    email: string;
};

type FeedItemProps = {
    commit: CommitType;
    isLast: boolean;
};

const FeedItem = ({ commit, isLast }: FeedItemProps) => {
    return (
        <li key={commit.name}>
            <div className="relative pb-8">
                {/* Line between feeed */}
                {!isLast && (
                    <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                    ></span>
                )}

                <div className="relative flex space-x-3">
                    <div>
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-support ring-8 ring-white">
                            {/* <!-- Heroicon name: user --> */}
                            <svg
                                className="w-5 h-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                {commit.message}
                            </p>
                        </div>
                        <div className="text-sm text-right text-gray-500 whitespace-nowrap">
                            <time>{commit.date}</time>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default FeedItem;
