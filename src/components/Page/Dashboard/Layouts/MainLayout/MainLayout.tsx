import React, { ReactNode } from 'react';
import Navbar from '../../Navbar/Navbar';

type MainLayoutProps = {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar colorIntensity="500" mainColor="orange" />
            {children}
        </div>
    );
}

export default MainLayout;