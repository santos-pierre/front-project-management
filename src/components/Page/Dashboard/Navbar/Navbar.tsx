import React, { useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';

import logo from './../../../../assets/img/logo_md.png';
import SearchSection from "./SearchSection/SearchSection";
import MenuDesktop from "./MenuDesktop/MenuDesktop";
import LogoSection from './LogoSection/LogoSection';
import MenuButtonMobile from './MenuButtonMobile/MenuButtonMobile';
import MenuMobile from './MenuMobile/MenuMobile';


function Navbar({ mainColor, colorIntensity }: InferProps<typeof Navbar.propTypes>) {

    const [isOpen, setIsOpen] = useState(false);

    const setStyle = (color: string, intensity: string): string => {
        return `flex-shrink-0 bg-${color}-${intensity}`;
    }

    return (
        <nav className={setStyle(mainColor, colorIntensity)}>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <LogoSection logo={logo} />
                    <SearchSection colorLogo={mainColor} placeholderColor={mainColor} backgroundInput={mainColor} textPlaceholder={mainColor} />
                    <MenuButtonMobile isOpen={isOpen} toogleVisibility={setIsOpen} colorButton={mainColor} />
                    <MenuDesktop textColor="orange" />
                </div>
                <MenuMobile textColor="orange" isOpen={isOpen} />
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