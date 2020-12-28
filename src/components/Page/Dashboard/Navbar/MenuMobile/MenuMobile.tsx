import React from 'react';
import { Link } from 'react-router-dom';

type MenuMobileProps = {
    isOpen: boolean;
    links: any;
    handleLogout: Function;
};

const MenuMobile = ({ isOpen, links, handleLogout }: MenuMobileProps) => {
    return (
        <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-2">
                <Link
                    to={links.home.href}
                    className="block px-3 py-2 text-base font-medium text-teal-200 rounded-md hover:text-teal-100 hover:bg-teal-600"
                >
                    Dashboard
                </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-teal-600">
                <div className="px-2">
                    <Link
                        to={links.profile.href}
                        className="block px-3 py-2 text-base font-medium text-teal-200 rounded-md hover:text-teal-100 hover:bg-teal-600"
                    >
                        Your Profile
                    </Link>
                    <span
                        className="block px-3 py-2 text-base font-medium text-teal-200 rounded-md cursor-pointer hover:text-teal-100 hover:bg-teal-600"
                        onClick={() => handleLogout()}
                    >
                        Log Out
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MenuMobile;
