import React, { ReactElement } from 'react';


type ContentLayoutProps = {
    left?: ReactElement,
    center?: ReactElement,
    right?: ReactElement
}

const ContentLayout = ({ left, center }: ContentLayoutProps) => {
    return (
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
            <div className="flex-1 min-w-0 bg-white xl:flex">
                {/* Left */}
                <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
                    {left}
                </div>
                {/* Middle */}
                <div className="bg-white lg:min-w-0 lg:flex-1">
                    {center}
                </div>
                {/* right */}
                <div className="bg-white pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
                    <div className="pl-6 lg:w-80">
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContentLayout;