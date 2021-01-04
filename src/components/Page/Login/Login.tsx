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
};

const Login = () => {
    const { handleSubmit, register } = useForm<Inputs>();
    const [errors, setErrors] = useState<Errors>();
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
                setErrors({ email: ['Server Problem, please try later'] });
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
                            {/* TODO:
                                - Social Media Icon + connection
                            */}
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
