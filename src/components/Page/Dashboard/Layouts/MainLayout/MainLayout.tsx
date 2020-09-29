import React, { ReactNode } from 'react';
import Navbar from '../../Navbar/Navbar';

export default ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar colorIntensity="500" mainColor="orange" />
            {children}
        </div>
    );
}