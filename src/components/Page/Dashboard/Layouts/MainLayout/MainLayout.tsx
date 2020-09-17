import React, { ReactNode } from 'react';

export default ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative min-h-screen flex flex-col">
            {children}
        </div>
    );
}