import React from 'react';

type StatusProjectProps = {
    status: string;
};

type StatusProjectType = {
    [key: string]: {
        color: string;
    };
};

type StatusStyleType = {
    background: string;
    color: string;
};

const StatusProject = ({ status }: StatusProjectProps) => {
    const STATUS_PROJECT: StatusProjectType = {
        done: {
            color: 'bg-success',
        },
        pending: {
            color: 'bg-warning',
        },
        late: {
            color: 'bg-warning',
        },
        give_up: {
            color: 'bg-danger',
        },
    };

    const setStyleByStatus = (): StatusStyleType => {
        return {
            color: `h-2 w-2 ${STATUS_PROJECT[status].color} rounded-full`,
            background: `h-4 w-4 ${STATUS_PROJECT[status].color} rounded-full flex items-center justify-center bg-opacity-30`,
        };
    };
    return (
        <span aria-label="Running" className={setStyleByStatus().background}>
            <span className={setStyleByStatus().color}></span>
        </span>
    );
};

export default StatusProject;
