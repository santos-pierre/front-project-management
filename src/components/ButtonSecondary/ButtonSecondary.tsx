import React from 'react';

type ButtonProps = {
    children: React.ReactNode,
}

const ButtonSecondary = ({children}:ButtonProps) => {
    return (
        <button type="button" className="inline-flex items-center justify-center px-4 py-2 border border-primary shadow-sm text-sm font-medium rounded-md text-primary bg-white hover:bg-primary hover:text-white focus:outline-none focus:ring-1 focus:ring-opacity-75 focus:ring-teal-500 w-full">
            {children}
        </button>
    )
}

export default ButtonSecondary;