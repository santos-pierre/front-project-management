import React from 'react';

type ButtonProps = {
    children: React.ReactNode
}

const ButtonPrimary = ({children}:ButtonProps) => {
    return (
        <button type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 xl:w-full">
            {children}
        </button>
    )
}

export default ButtonPrimary;