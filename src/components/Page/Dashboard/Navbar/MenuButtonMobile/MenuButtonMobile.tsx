import React from 'react';

type MenuButtonMobileProps = {
    isOpen: boolean,
    toogleVisibility: Function,
}

const MenuButtonMobile = ({ isOpen, toogleVisibility}: MenuButtonMobileProps) => {
    const handleVisibility = () => {
        toogleVisibility(!isOpen);
    }

    return (
        <div className="flex lg:hidden">
            <button className="bg-teal-600 inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-600 focus:ring-white" aria-label="Main menu" aria-expanded="false" onClick={handleVisibility}>
                <svg className={`${isOpen ? "hidden" : "block"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
                <svg className={`${isOpen ? "block" : "hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default MenuButtonMobile;