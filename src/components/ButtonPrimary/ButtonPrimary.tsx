import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
};

const ButtonPrimary = ({ children }: ButtonProps) => {
    return (
        <button
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
            {children}
        </button>
    );
};

export default ButtonPrimary;
