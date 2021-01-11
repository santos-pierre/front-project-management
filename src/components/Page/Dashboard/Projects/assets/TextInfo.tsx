import React, { ReactNode } from 'react';

type TextInfoProps = {
    text: string;
    link_url?: string;
    children?: ReactNode;
    as?: React.ElementType;
};

const TextInfo = ({
    text,
    link_url,
    children,
    as: Tag = 'span',
}: TextInfoProps) => {
    return (
        <Tag
            className="group flex items-center space-x-2.5 text-gray-500"
            href={link_url}
            target="_blanck"
        >
            {/* Icon PLaceholder */}
            {children}
            <div
                className="w-64 text-sm font-medium leading-5 text-gray-500 truncate group-hover:text-gray-900 dark:group-hover:text-gray-300 lg:w-40"
                title={text}
            >
                {text}
            </div>
        </Tag>
    );
};

export default TextInfo;
