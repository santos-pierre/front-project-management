import React from 'react';
import { Link } from 'react-router-dom';
import { getRoute } from '../../../../../routes/routes';

type LogoSectionProps = {
    logo: string
}

const LogoSection = ({ logo }: LogoSectionProps) => {
    return (
        <Link to={getRoute('dashboard').path}>
            <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-0">
                    <img className="h-8 w-auto" src={logo} alt="Workflow logo" />
                </div>
            </div>
        </Link>
    )
}


export default LogoSection;