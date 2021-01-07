import React, { useEffect, useState } from 'react';

import logo from './../../../assets/img/logo_svg.svg';
import { getRoute } from '../../../routes/routes';
import { useForm } from 'react-hook-form';

import usersClient from '../../../api/users/usersClient';
import { useHistory } from 'react-router-dom';
import InputForm from '../../InputForm/InputForm';
import ButtonForm from '../../ButtonForm/ButtonForm';

type Inputs = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const Register = () => {
    const inputsControls = {
        name: {
            required: {
                value: true,
                message: 'The name is required',
            },
            maxLength: {
                value: 255,
                message: 'You name cannot exceed 255 characters',
            },
        },
        email: {
            required: {
                value: true,
                message: 'The email is required',
            },
            pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                message: 'Your email is not valid',
            },
            maxLength: {
                value: 255,
                message: 'You email cannot exceed 255 characters',
            },
            validate: {
                emailAlreadyTaken: (value: any) => emailAlreadyTaken(value),
            },
        },
        password: {
            required: {
                value: true,
                message: 'The password is required',
            },
            minLength: {
                value: 8,
                message: 'You password must contains at least 8 characters',
            },
        },
        password_confirmation: {
            required: {
                value: true,
                message: 'The password confirmation is required',
            },
            validate: {
                confirmPassword: (value: any) =>
                    getValues('password') === value,
            },
        },
    };

    const { register, handleSubmit, errors, getValues } = useForm<Inputs>();

    const history = useHistory();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (data: object) => {
        setLoading(true);
        if (Object.keys(errors).length === 0) {
            try {
                await usersClient.registerUser(data);
                setLoading(false);
                history.push(getRoute('login').path);
            } catch (error) {
                setLoading(false);
            }
        }
    };

    const emailAlreadyTaken = async (email: string) => {
        try {
            const response = await usersClient.emailAlreadyTaken(email);
            return !response.data.alreadyTaken;
        } catch (error) {}
    };

    useEffect(() => {
        document.title = 'Projects - Register';
    }, []);

    return (
        <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-blueGray-700">
                <img
                    className="w-auto h-12 mx-auto"
                    src={logo}
                    alt="Project Management"
                />
                <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center">
                    Create your account
                </h2>
                <p className="mt-2 text-sm leading-5 text-center max-w">
                    Or
                    <a
                        href={getRoute('login').path}
                        className="font-medium transition duration-150 ease-in-out text-primary hover:text-opacity-70 focus:outline-none focus:underline"
                    >
                        {' '}
                        login to an exsiting account
                    </a>
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <InputForm
                            name="name"
                            type="text"
                            label="Name"
                            ref={register(inputsControls.name)}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="test@test.com"
                            ref={register(inputsControls.email)}
                            error={
                                errors.email
                                    ? errors.email.type === 'emailAlreadyTaken'
                                        ? 'Email already taken'
                                        : errors.email.message
                                    : ''
                            }
                        />
                        <InputForm
                            name="password"
                            type="password"
                            label="Password"
                            placeholder=""
                            ref={register(inputsControls.password)}
                            error={errors.password && errors.password.message}
                        />
                        <InputForm
                            name="password_confirmation"
                            type="password"
                            label="Password Confirmation"
                            placeholder=""
                            ref={register(inputsControls.password_confirmation)}
                            error={
                                errors.password_confirmation
                                    ? errors.password_confirmation.type ===
                                      'confirmPassword'
                                        ? 'Passwords must match'
                                        : errors.password_confirmation.message
                                    : ''
                            }
                        />
                        <ButtonForm
                            text="Register"
                            colorClass="bg-primary"
                            isLoading={isLoading}
                            additionalClass="focus:ring-2 focus:ring-teal-300"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
