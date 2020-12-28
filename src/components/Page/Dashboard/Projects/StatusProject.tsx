import React from 'react';

type StatusProjectProps = {
    status: string;
};

type StatusProjectType = {
    [key: string]: {
        color: string;
        background: string;
    };
};

type StatusStyleType = {
    background: string;
    color: string;
};

const StatusProject = ({ status }: StatusProjectProps) => {
    const STATUS_PROJECT: StatusProjectType = {
        done: {
            color: 'bg-green-400',
            background: 'bg-green-100',
        },
        pending: {
            color: 'bg-yellow-400',
            background: 'bg-yellow-100',
        },
        late: {
            color: 'bg-orange-400',
            background: 'bg-orange-100',
        },
        give_up: {
            color: 'bg-red-400',
            background: 'bg-red-100',
        },
    };

    const setStyleByStatus = (): StatusStyleType => {
        return {
            color: `h-2 w-2 ${STATUS_PROJECT[status].color} rounded-full`,
            background: `h-4 w-4 ${STATUS_PROJECT[status].background} rounded-full flex items-center justify-center`,
        };
    };
    return (
        <span aria-label="Running" className={setStyleByStatus().background}>
            <span className={setStyleByStatus().color}></span>
        </span>
    );
};

export default StatusProject;
