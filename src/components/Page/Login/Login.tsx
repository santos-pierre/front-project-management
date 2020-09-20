import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import usersClient from '../../../api/users/usersClient';
import { useHistory } from 'react-router-dom';
import { setCurrentUser } from '../../../redux/user/userAction';
import { useDispatch } from 'react-redux';

import Footer from '../../Footer/Footer';

import imgLogin from './../../../assets/img/login_img.png';
import logo from './../../../assets/img/logo_big.png';
import { UserType } from '../../../types/UserType';
import { getRoute } from '../../../routes/routes';


type Inputs = {
    email: string,
    password: string,
};

type Errors = {
    email: Array<string>
}

export default () => {
    const { handleSubmit, register } = useForm<Inputs>();
    const [errors, setErrors] = useState<Errors>();
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const setUser = useCallback((user: UserType) => {
        dispatch(setCurrentUser(user));
    }, [dispatch]);

    const onSubmit = async (data: Object) => {
        setLoading(true);
        try {
            await usersClient.login(data);
            const currentUser = await usersClient.currentUser();
            setLoading(false);
            setUser({ ...currentUser.data, isAuthenticated: true });
            history.push(getRoute('dashboard').path);
        } catch (error) {
            setLoading(false);
            if (error && error.data.errors) {
                setErrors(error.data.errors);
            } else {
                setErrors({ email: ['Server Problem, please try later'] })
            }
        }
    };

    const InputStyles = {
        normal: 'focus:border-blue-300 focus:shadow-outline-blue border-gray-300',
        errors: 'focus:border-red-300 shadow-outline-red focus:shadow-outline-red border-red-300'
    }

    useEffect(() => {
        document.title = 'Projects - Sign in';
    }, []);

    return (
        <div className="min-h-screen bg-white flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-40">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Header Title + Logo */}
                    <div>
                        <img className="h-12 w-auto" src={logo} alt="project management" />
                        <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
                            Log in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
                            Or
                            <a href={getRoute('register').path} className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline transition ease-in-out duration-150"> create a new account</a>
                        </p>
                    </div>
                    {/* END Header Title + Logo */}
                    <div className="mt-8">
                        <div>
                            {/* TODO:
                                - Social Media Icon + connection
                            */}
                            {/* FORM  */}
                            <div className="mt-6">
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input id="email" type="email" required className={`appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${errors ? InputStyles.errors : InputStyles.normal}`} name="email" ref={register} />
                                        </div>
                                        {errors?.email && <label className="text-red-500 text-sm">{errors.email[0]}</label>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1 rounded-md shadow-sm">
                                            <input id="password" type="password" required className={`appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${errors ? InputStyles.errors : InputStyles.normal}`} name="password" ref={register} />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block w-full rounded-md shadow-sm">
                                            <button type="submit" disabled={isLoading} className={`w-full flex justify-around py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!isLoading ? 'bg-orange-600' : 'cursor-not-allowed bg-orange-400'} hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out`}>
                                                <span>
                                                    Log in
                                                    <svg className={`animate-spin mr-3 h-5 w-5 text-white inline ml-2 ${isLoading ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </span>
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
                <img className="absolute right-0 h-full w-full object-scale-down" src={imgLogin} alt="project management" />
            </div>
            <Footer customClass="w-full absolute bottom-0" />
        </div>
    )
}