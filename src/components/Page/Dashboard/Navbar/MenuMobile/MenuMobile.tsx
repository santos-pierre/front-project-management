import React from 'react';
import { Link } from 'react-router-dom';

type MenuMobileProps = {
    textColor: string | 'orange',
    isOpen: boolean,
    links: any,
    handleLogout: Function
}

const MenuMobile = ({ textColor, isOpen, links, handleLogout }: MenuMobileProps) => {
    const setSyleMenu = (textColor: string, first: boolean = false): string => {
        if (first) {
            return `block px-3 py-2 rounded-md text-base font-medium text-${textColor}-200 hover:text-${textColor}-100 hover:bg-${textColor}-600 focus:outline-none focus:text-${textColor}-100 focus:bg-${textColor}-600 transition duration-150 ease-in-out`
        } else {
            return `mt-1 block px-3 py-2 rounded-md text-base font-medium text-${textColor}-200 hover:text-${textColor}-100 hover:bg-${textColor}-600 focus:outline-none focus:text-white focus:bg-${textColor}-600 transition duration-150 ease-in-out`
        }
    }

    const setStyleUserMenu = (textColor: string, first: boolean = false): string => {
        if (first) {
            return `cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-${textColor}-200 hover:text-${textColor}-100 hover:bg-${textColor}-600 focus:outline-none focus:text-white focus:bg-${textColor}-500 transition duration-150 ease-in-out`
        } else {
            return `cursor-pointer mt-1 block px-3 py-2 rounded-md text-base font-medium text-${textColor}-200 hover:text-${textColor}-100 hover:bg-${textColor}-600 focus:outline-none focus:text-white focus:bg-${textColor}-500 transition duration-150 ease-in-out`
        }
    }

    const setStyleHeadingLine = (textColor: string): string => {
        return `pt-4 pb-3 border-t border-${textColor}-600`
    }

    return (
        <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className="px-2 pt-2 pb-3">
                <Link to={links.home.href} className={setSyleMenu(textColor, true)}>Dashboard</Link>
                {/* <a href="/15" className={setSyleMenu(textColor)}>Support</a> */}
            </div>
            <div className={setStyleHeadingLine(textColor)}>
                <div className="px-2">
                    <Link to={links.profile.href} className={setStyleUserMenu(textColor, true)}>Your Profile</Link>
                    <span className={setStyleUserMenu(textColor)} onClick={() => handleLogout()}>Log Out</span>
                </div>
            </div>
        </div >
    )
}

export default MenuMobile;