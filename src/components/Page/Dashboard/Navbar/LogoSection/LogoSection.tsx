import React from 'react';
import PropTypes, { InferProps } from "prop-types";
import { Link } from 'react-router-dom';
import { getRoute } from '../../../../../routes/routes';



function LogoSection({ logo }: InferProps<typeof LogoSection.propTypes>) {
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

LogoSection.propTypes = {
    logo: PropTypes.string.isRequired
}

export default LogoSection;