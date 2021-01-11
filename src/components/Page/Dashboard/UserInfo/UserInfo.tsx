import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoute } from '../../../../routes/routes';
import { RootState } from '../../../../types/RooState';
import ButtonPrimary from '../../../ButtonPrimary/ButtonPrimary';

const UserInfo = () => {
    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );

    return (
        <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                    <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-12 h-12">
                                {currentUser.photo ? (
                                    <img
                                        className="w-12 h-12 rounded-full"
                                        src={currentUser.photo}
                                        alt=""
                                    />
                                ) : (
                                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                                        <svg
                                            className="w-full h-full text-gray-300"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-medium leading-5">
                                    {currentUser.name}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row xl:flex-col xl:space-x-0 xl:space-y-3">
                            <Link
                                to={getRoute('projects-create').path}
                                className="inline-flex rounded-md shadow-sm"
                            >
                                <ButtonPrimary>New Project</ButtonPrimary>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
