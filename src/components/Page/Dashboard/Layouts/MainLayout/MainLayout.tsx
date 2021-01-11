import React, { ReactNode } from 'react';
import Navbar from '../../Navbar/Navbar';

type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="relative flex flex-col min-h-screen text-gray-900 bg-gray-50 dark:bg-blueGray-800 dark:text-gray-100">
            <Navbar />
            {children}
        </div>
    );
};

export default MainLayout;
