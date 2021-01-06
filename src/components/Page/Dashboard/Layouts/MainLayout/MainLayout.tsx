import React, { ReactNode } from 'react';
import Navbar from '../../Navbar/Navbar';

type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Navbar />
            {children}
        </div>
    );
};

export default MainLayout;
