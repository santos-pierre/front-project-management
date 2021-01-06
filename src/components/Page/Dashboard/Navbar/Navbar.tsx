import React, { useCallback, useState } from 'react';

import logo from './../../../../assets/img/logo_svg.svg';
import SearchSection from './SearchSection/SearchSection';
import MenuDesktop from './MenuDesktop/MenuDesktop';
import LogoSection from './LogoSection/LogoSection';
import MenuButtonMobile from './MenuButtonMobile/MenuButtonMobile';
import MenuMobile from './MenuMobile/MenuMobile';
import usersClient from '../../../../api/users/usersClient';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserType } from '../../../../types/UserType';
import { setCurrentUser } from '../../../../redux/user/userAction';

const defaultUser: UserType = {
    name: undefined,
    email: undefined,
    photo: undefined,
    isAuthenticated: false,
};

function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const setUser = useCallback(
        (user: UserType) => {
            dispatch(setCurrentUser(user));
        },
        [dispatch]
    );

    const links = {
        home: {
            href: '/',
        },
        profile: {
            href: '/profile',
        },
    };

    const onLogout = async () => {
        try {
            await usersClient.logout();
            setUser(defaultUser);
            localStorage.removeItem('sanctum_token');
        } catch (error) {}
    };

    return (
        <nav className="flex-shrink-0 bg-primary">
            <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <LogoSection logo={logo} />
                    <SearchSection />
                    <MenuButtonMobile
                        isOpen={isOpen}
                        toogleVisibility={setIsOpen}
                    />
                    <MenuDesktop links={links} handleLogout={onLogout} />
                </div>
                <MenuMobile
                    isOpen={isOpen}
                    links={links}
                    handleLogout={onLogout}
                />
            </div>
        </nav>
    );
}

export default Navbar;
