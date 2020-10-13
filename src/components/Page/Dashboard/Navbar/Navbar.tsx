import React, { useCallback, useState } from 'react';

import logo from './../../../../assets/img/logo_md.png';
import SearchSection from "./SearchSection/SearchSection";
import MenuDesktop from "./MenuDesktop/MenuDesktop";
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
    isAuthenticated: false
}
type NavbarProps = {
    mainColor: string,
    colorIntensity: string
}

function Navbar({ mainColor, colorIntensity = '700' }: NavbarProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const setUser = useCallback((user: UserType) => {
        dispatch(setCurrentUser(user));
    }, [dispatch]);

    const setStyle = (color: string, intensity: string): string => {
        return `flex-shrink-0 bg-${color}-${intensity}`;
    }

    const links = {
        home: {
            href: '/',
        },
        profile: {
            href: '/profile'
        },
    }

    const onLogout = async () => {
        try {
            await usersClient.logout();
            setUser(defaultUser);
            history.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className={setStyle(mainColor, colorIntensity)}>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <LogoSection logo={logo} />
                    <SearchSection colorLogo={mainColor} placeholderColor={mainColor} backgroundInput={mainColor} textPlaceholder={mainColor} />
                    <MenuButtonMobile isOpen={isOpen} toogleVisibility={setIsOpen} colorButton={mainColor} />
                    <MenuDesktop links={links} handleLogout={onLogout} />
                </div>
                <MenuMobile textColor="orange" isOpen={isOpen} links={links} handleLogout={onLogout} />
            </div>
        </nav>
    )
}

export default Navbar;