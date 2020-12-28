import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../types/RooState';
import { Link, NavLink } from 'react-router-dom';

type MenuDesktopProps = {
    links: any;
    handleLogout: Function;
};

const MenuDesktop = ({ links, handleLogout }: MenuDesktopProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const user = useSelector((state: RootState) => state.user.currentUser);

    return (
        <div className="hidden lg:block lg:w-80">
            <div className="flex items-center justify-end">
                <div className="flex">
                    <NavLink
                        to={links.home.href}
                        className="px-3 py-2 text-sm font-medium text-teal-200 rounded-md hover:text-white"
                    >
                        Dashboard
                    </NavLink>
                </div>
                <div className="relative flex-shrink-0 ml-4">
                    <div>
                        <button
                            onBlur={() => setIsOpen(false)}
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex text-sm text-white transition duration-150 ease-in-out rounded-full focus:outline-none focus:shadow-solid"
                            id="user-menu"
                            aria-label="User menu"
                            aria-haspopup="true"
                        >
                            {user.photo ? (
                                <img
                                    className="w-8 h-8 bg-white rounded-full"
                                    src={user.photo}
                                    alt=""
                                />
                            ) : (
                                <span className="inline-block w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
                                    <svg
                                        className="w-full h-full text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    </div>
                    <Transition
                        show={isOpen}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                            <div
                                className="py-1 bg-white rounded-md shadow-xs"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu"
                            >
                                <Link
                                    to={links.profile.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    View Profile
                                </Link>
                                <span
                                    onClick={() => handleLogout()}
                                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                    role="menuitem"
                                >
                                    Log Out
                                </span>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default MenuDesktop;
