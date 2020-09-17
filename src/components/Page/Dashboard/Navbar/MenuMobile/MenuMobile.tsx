import React from 'react';
import PropTypes, { InferProps } from "prop-types";

function MenuMobile({ textColor, isOpen }: InferProps<typeof MenuMobile.propTypes>) {
    const setSyleMenu = (textColor: string, first: boolean = false): string => {
        if (first) {
            return `block px-3 py-2 rounded-md text-base font-medium text-white bg-${textColor}-700 focus:outline-none focus:text-${textColor}-100 focus:bg-${textColor}-600 transition duration-150 ease-in-out`
        } else {
            return `mt-1 block px-3 py-2 rounded-md text-base font-medium text-${textColor}-200 hover:text-${textColor}-100 hover:bg-${textColor}-600 focus:outline-none focus:text-white focus:bg-${textColor}-600 transition duration-150 ease-in-out`
        }
    }

    const setStyleUserMenu = (textColor: string, first: boolean = false): string => {
        if (first) {
            return `block px-3 py-2 rounded-md text-base font-medium text-${textColor}-200 hover:text-${textColor}-100 hover:bg-${textColor}-500 focus:outline-none focus:text-white focus:bg-${textColor}-500 transition duration-150 ease-in-out`
        } else {
            return `mt-1 block px-3 py-2 rounded-md text-base font-medium text-${textColor}-200 hover:text-${textColor}-100 hover:bg-${textColor}-500 focus:outline-none focus:text-white focus:bg-${textColor}-500 transition duration-150 ease-in-out`
        }
    }

    const setStyleHeadingLine = (textColor: string): string => {
        return `pt-4 pb-3 border-t border-${textColor}-700`
    }

    return (
        <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className="px-2 pt-2 pb-3">
                <a href="/15" className={setSyleMenu(textColor, true)}>Dashboard</a>
                <a href="/15" className={setSyleMenu(textColor)}>Support</a>
            </div>
            <div className={setStyleHeadingLine(textColor)}>
                <div className="px-2">
                    <a href="/15" className={setStyleUserMenu(textColor, true)}>Your Profile</a>
                    <a href="/15" className={setStyleUserMenu(textColor)}>Settings</a>
                    <a href="/15" className={setStyleUserMenu(textColor)}>Sign out</a>
                </div>
            </div>
        </div >
    )
}

MenuMobile.propTypes = {
    textColor: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired
}

MenuMobile.defaultProps = {
    textColor: 'orange'
}

export default MenuMobile;