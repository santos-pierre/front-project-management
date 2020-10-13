import React from 'react';

type SearchSectionProps = {
    colorLogo: string,
    placeholderColor: string,
    backgroundInput: string,
    textPlaceholder: string,
    textPlaceholderFocus?: string
}

const SearchSection = ({ colorLogo = 'indigo', placeholderColor = 'gray', backgroundInput = 'indigo', textPlaceholder = 'gray', textPlaceholderFocus = 'gray' }: SearchSectionProps) => {
    const setStyleLogoInput = (colorLogo: string) => {
        return `relative text-${colorLogo}-300 focus-within:text-gray-400`;
    }

    const setStyleInput = (placeholderColor: string, backgroundInput: string, textPlaceholder: string, textPlaceholderFocus: string): string => {
        return `block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-${backgroundInput}-400 bg-opacity-25 text-${textPlaceholder}-300 placeholder-${placeholderColor}-300 focus:outline-none focus:bg-white focus:placeholder-${textPlaceholderFocus}-400 focus:text-${textPlaceholderFocus}-900 sm:text-sm transition duration-150 ease-in-out`;
    }

    return (
        <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full px-2 lg:px-6">
                <label htmlFor="search" className="sr-only">Search projects</label>
                <div className={setStyleLogoInput(colorLogo)}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input id="search" className={setStyleInput(placeholderColor, backgroundInput, textPlaceholder, textPlaceholderFocus)} placeholder="Search projects" type="search" />
                </div>
            </div>
        </div>
    )
}

export default SearchSection;