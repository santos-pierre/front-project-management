import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import usersClient from '../../../api/users/usersClient';
import { useHistory } from 'react-router-dom';
import { setCurrentUser } from '../../../redux/user/userAction';
import { useDispatch } from 'react-redux';
import InputForm from './../../InputForm/InputForm';

import Footer from '../../Footer/Footer';

import imgLogin from './../../../assets/img/login_img.png';
import logo from './../../../assets/img/logo_svg.svg';
import { UserType } from '../../../types/UserType';
import { getRoute } from '../../../routes/routes';
import ButtonForm from '../../ButtonForm/ButtonForm';
import checkAuthenticate from '../../../utils/isAuthenticate';

type Inputs = {
    email: string;
    password: string;
};

type Errors = {
    email: Array<string>;
    password: Array<string> | undefined;
};

const Login = () => {
    const { handleSubmit, register } = useForm<Inputs>();
    const [errors, setErrors] = useState<Errors>({ email: [], password: [] });
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const setUser = useCallback(
        (user: UserType) => {
            dispatch(setCurrentUser(user));
        },
        [dispatch]
    );

    const onSubmit = async (data: Object) => {
        setLoading(true);
        try {
            let response = await usersClient.login(data);
            setLoading(false);
            localStorage.setItem(
                'sanctum_token',
                response.data.sanctum_access_token
            );
            setUser({
                ...response.data.user,
                isAuthenticated: checkAuthenticate(),
            });
            history.push(getRoute('dashboard').path);
        } catch (error) {
            setLoading(false);
            if (error && error.data.errors) {
                setErrors(error.data.errors);
            } else {
                setErrors({
                    email: ['Server Problem, please try later'],
                    password: [],
                });
            }
        }
    };

    useEffect(() => {
        document.title = 'Projects - Sign in';
    }, []);

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-40">
                <div className="w-full max-w-sm mx-auto lg:w-96">
                    {/* Header Title + Logo */}
                    <div className="text-blueGray-700">
                        <img
                            className="w-auto h-12"
                            src={logo}
                            alt="project management"
                        />
                        <h2 className="mt-6 text-3xl font-extrabold leading-9">
                            Log in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-5 max-w">
                            Or
                            <a
                                href={getRoute('register').path}
                                className="font-medium transition duration-150 ease-in-out text-primary hover:text-opacity-75 focus:outline-none focus:underline"
                            >
                                {' '}
                                create a new account
                            </a>
                        </p>
                    </div>
                    {/* END Header Title + Logo */}
                    <div className="mt-8">
                        <div>
                            <div>
                                <div className="mt-1">
                                    <div>
                                        <a
                                            href={`${process.env.REACT_APP_API}/login/github`}
                                        >
                                            <button className="inline-flex justify-center w-full px-4 py-2 space-x-2 text-sm font-medium text-gray-500 transition-colors duration-300 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-blueGray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:bg-black focus:text-white">
                                                <span>Sign in with GitHub</span>
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-6">
                                <div
                                    className="absolute inset-0 flex items-center"
                                    aria-hidden="true"
                                >
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 text-gray-500 bg-white">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            {/* FORM  */}
                            <div className="mt-6">
                                <form
                                    className="space-y-6"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <InputForm
                                        name="email"
                                        placeholder="example@email.com"
                                        type="email"
                                        label="Email address"
                                        error={
                                            errors?.email ? errors.email[0] : ''
                                        }
                                        ref={register}
                                    />
                                    <InputForm
                                        name="password"
                                        type="password"
                                        label="Password"
                                        ref={register}
                                        error={
                                            errors?.password
                                                ? errors.password[0]
                                                : ''
                                        }
                                    />
                                    <ButtonForm
                                        text="Log in"
                                        colorClass="bg-primary"
                                        isLoading={isLoading}
                                        additionalClass="focus:ring-2 focus:ring-teal-300"
                                    />
                                </form>
                            </div>
                        </div>
                        {/* END FORM  */}
                    </div>
                </div>
            </div>
            <div className="relative flex-1 hidden w-0 lg:block">
                <img
                    className="absolute right-0 object-scale-down w-full h-full"
                    src={imgLogin}
                    alt="project management"
                />
            </div>
            <Footer customClass="w-full absolute bottom-0" />
        </div>
    );
};

export default Login;
