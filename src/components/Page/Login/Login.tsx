import React, { useEffect } from 'react';
import Footer from '../../Footer/Footer';

import imgLogin from './../../../assets/img/login_img.png';
import logo from './../../../assets/img/logo_big.png';

export default () => {
    useEffect(() => {
        document.title = 'Projects - Sign in';
    }, []);
    return (
        <div className="min-h-screen bg-white flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-40">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Header Title + Logo */}
                    <div>
                        <img className="h-12 w-auto" src={logo} alt="Workflow" />
                        <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
                            Log in to your account
                        </h2>
                    </div>
                    {/* END Header Title + Logo */}
                    <div className="mt-8">
                        <div>
                            {/* TODO:
                                - Social Media Icon + connection
                            */}
                            {/* FORM  */}
                            <div className="mt-6">
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input id="email" type="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input id="password" type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block w-full rounded-md shadow-sm">
                                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
                                                Log in
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* END FORM  */}
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <img className="absolute right-0 h-full w-full lg:object-scale-down xl:object-fill" src={imgLogin} alt="" />
            </div>
            <Footer customClass="w-full absolute bottom-0" />
        </div>
    )
}