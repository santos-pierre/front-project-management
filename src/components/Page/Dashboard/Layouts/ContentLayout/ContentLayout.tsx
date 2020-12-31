import React, { ReactElement } from 'react';

type ContentLayoutProps = {
    left?: ReactElement;
    center?: ReactElement;
    right?: ReactElement;
};

const ContentLayout = ({ left, center, right }: ContentLayoutProps) => {
    return (
        <div className="flex-grow w-full mx-auto max-w-7xl xl:px-8 lg:flex">
            <div className="flex-1 min-w-0 bg-white xl:flex">
                {/* Left */}
                <div className="bg-white xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200">
                    {left}
                </div>
                {/* Middle */}
                <div className="bg-white lg:min-w-0 lg:flex-1">{center}</div>
                {/* right */}
                <div className="pr-4 bg-white sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
                    <hr className="block ml-8 mr-4 md:hidden" />
                    <div className="pl-6 mt-8 lg:w-80">{right}</div>
                </div>
            </div>
        </div>
    );
};

export default ContentLayout;
