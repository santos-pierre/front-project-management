import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoute } from '../../../routes/routes';
import { RootState } from '../../../types/RooState';

const Page404 = () => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col">
            <h1 className="text-3xl font-extrabold text-center">Oops we didn't found what you looking for !</h1>
            <h2 className="text-3xl font-bold">( Error 404 )</h2>
            {
                currentUser.isAuthenticated ?
                    <Link to={getRoute('dashboard').path}>
                        <span className="inline-flex items-center text-2xl text-orange-500 font-semibold hover:text-orange-600 justify-center">
                            <svg className="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        Back to dashboard
                        </span>
                    </Link>
                    :
                    <Link to={getRoute('login').path}>
                        <span className="inline-flex items-center text-2xl text-orange-500 font-semibold hover:text-orange-600 justify-center">
                            <svg className="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        Back to login
                        </span>
                    </Link>
            }
        </div>
    )
}

export default Page404;