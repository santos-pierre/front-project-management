import React from 'react';

type ButtonFormProps = {
    colorClass: string;
    additionalClass?: string;
    isLoading?: boolean;
    text: string;
};

const ButtonForm = ({
    colorClass,
    additionalClass,
    isLoading,
    text,
}: ButtonFormProps) => {
    return (
        <span className="block w-full rounded-md shadow-sm">
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-around py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    !isLoading
                        ? colorClass
                        : `${colorClass} cursor-not-allowed bg-opacity-70`
                } transition duration-150 ease-in-out hover:bg-opacity-70 focus:outline-none ${additionalClass}`}
            >
                <span>
                    {text}
                    <svg
                        className={`animate-spin mr-3 h-5 w-5 text-white inline ml-2 ${
                            isLoading ? 'block' : 'hidden'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </span>
            </button>
        </span>
    );
};

export default ButtonForm;
