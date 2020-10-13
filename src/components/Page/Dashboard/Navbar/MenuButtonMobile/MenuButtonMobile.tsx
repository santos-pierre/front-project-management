import React from 'react';
import PropTypes, { InferProps } from "prop-types";

function MenuButtonMobile({ isOpen, toogleVisibility, colorButton }: InferProps<typeof MenuButtonMobile.propsTypes>) {
    const setStyle = (colorButton: string): string => {
        return `inline-flex items-center justify-center p-2 rounded-md text-${colorButton}-400 hover:text-white hover:bg-${colorButton}-600 focus:outline-none focus:bg-${colorButton}-600 focus:text-white transition duration-150 ease-in-out`;
    }

    const handleVisibility = () => {
        toogleVisibility(!isOpen);
    }

    return (
        <div className="flex lg:hidden">
            <button className={setStyle(colorButton)} aria-label="Main menu" aria-expanded="false" onClick={handleVisibility}>
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

MenuButtonMobile.propsTypes = {
    isOpen: PropTypes.bool.isRequired,
    toogleVisibility: PropTypes.func.isRequired,
    colorButton: PropTypes.string.isRequired,
}

MenuButtonMobile.defaultProps = {
    colorButton: 'indigo'
}


export default MenuButtonMobile;