import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
};

const ButtonSecondary = ({ children }: ButtonProps) => {
    return (
        <button
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium border rounded-md shadow-sm border-primary text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-1 focus:ring-opacity-75 focus:ring-teal-500"
        >
            {children}
        </button>
    );
};

export default ButtonSecondary;
