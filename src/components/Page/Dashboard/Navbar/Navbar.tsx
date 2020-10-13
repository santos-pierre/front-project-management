import React, { useCallback, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';

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

function Navbar({ mainColor, colorIntensity }: InferProps<typeof Navbar.propTypes>) {

    const [isOpen, setIsOpen] = useState(false);
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
            const response = await usersClient.logout();
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
                    <MenuDesktop textColor="orange" links={links} handleLogout={onLogout} />
                </div>
                <MenuMobile textColor="orange" isOpen={isOpen} links={links} handleLogout={onLogout} />
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    mainColor: PropTypes.string.isRequired,
    colorIntensity: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    colorIntensity: '700'
}

export default Navbar;