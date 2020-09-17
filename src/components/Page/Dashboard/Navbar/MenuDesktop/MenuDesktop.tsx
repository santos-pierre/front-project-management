import React, { useState } from 'react';
import { Transition } from "@tailwindui/react";
import PropTypes, { InferProps } from "prop-types";

function MenuDesktop({ textColor }: InferProps<typeof MenuDesktop.propTypes>) {
    const [isOpen, setIsOpen] = useState(false);

    const setStyle = (textColor: string): string => {
        return `px-3 py-2 rounded-md text-sm leading-5 font-medium text-${textColor}-200 hover:text-white focus:outline-none focus:text-white focus:bg-${textColor}-600 transition duration-150 ease-in-out`;
    }

    return (
        <div className="hidden lg:block lg:w-80">
            <div className="flex items-center justify-end">
                <div className="flex">
                    <a href="/15" className={setStyle(textColor)}>Documentation</a>
                    <a href="/15" className={setStyle(textColor)}>Support</a>
                </div>
                <div className="ml-4 relative flex-shrink-0">
                    <div>
                        <button onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(!isOpen)} className="flex text-sm rounded-full text-white focus:outline-none focus:shadow-solid transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true">
                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80" alt="" />
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
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                            <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <a href="/15" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">View Profile</a>
                                <a href="/15" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Settings</a>
                                <a href="/15" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out" role="menuitem">Logout</a>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    )
}

MenuDesktop.propTypes = {
    textColor: PropTypes.string.isRequired,
}

MenuDesktop.defaultProps = {
    textColor: 'orange'
}

export default MenuDesktop;