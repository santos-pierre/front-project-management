import React, { useEffect } from "react";

import logo from './../../../assets/img/logo_big.png';
import { getRoute } from "../../../routes/routes";
import { useForm } from "react-hook-form";

import usersClient from '../../../api/users/usersClient';
import { useHistory } from "react-router-dom";

export default () => {

    type Inputs = {
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    };

    const InputStyles = {
        normal: 'focus:border-blue-300 focus:shadow-outline-blue border-gray-300',
        errors: 'focus:border-red-300 shadow-outline-red focus:shadow-outline-red border-red-300'
    }

    const inputsControls = {
        name: {
            required: {
                value: true,
                message: 'The name is required'
            },
            maxLength: {
                value: 255,
                message: 'You name cannot exceed 255 characters'
            },
        },
        email: {
            required: {
                value: true,
                message: 'The email is required'
            },
            pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
                message: 'Your email is not valid'
            },
            maxLength: {
                value: 255,
                message: 'You email cannot exceed 255 characters'
            },
            validate: {
                emailAlreadyTaken: (value: any) => emailAlreadyTaken(value),
            }
        },
        password: {
            required: {
                value: true,
                message: 'The password is required'
            },
            minLength: {
                value: 8,
                message: 'You password must contains at least 8 characters'
            },
        },
        password_confirmation: {
            required: {
                value: true,
                message: 'The password confirmation is required'
            },
            validate: {
                confirmPassword: (value: any) => getValues('password') === value,
            }
        }
    }

    const { register, handleSubmit, errors, getValues } = useForm<Inputs>();

    const history = useHistory();

    const onSubmit = async (data: object) => {
        if (Object.keys(errors).length === 0) {
            try {
                await usersClient.registerUser(data);
                history.push(getRoute('login').path);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const emailAlreadyTaken = async (email: string) => {
        try {
            const response = await usersClient.emailAlreadyTaken({ email: email });
            return !response.data.alreadyTaken;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = 'Projects - Register';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-12 w-auto" src={logo} alt="Project Management" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
                    Or
                <a href={getRoute('login').path} className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:underline transition ease-in-out duration-150"> login to an exsiting account</a>
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                Name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input id="name" type="text" required className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${errors.name ? InputStyles.errors : InputStyles.normal}`} name="name" ref={register(inputsControls.name)} />
                            </div>
                            {errors.name && <label className="text-red-500 text-sm">{errors.name.message}</label>}
                        </div>
                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input id="email" type="email" required className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${errors.email ? InputStyles.errors : InputStyles.normal}`} name="email" ref={register(inputsControls.email)} />
                            </div>
                            {errors.email && <label className="text-red-500 text-sm ml-2">{errors.email.message}</label>}
                            {errors.email && errors.email.type === "emailAlreadyTaken" && <label className="text-red-500 text-sm">Email already taken</label>}
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input id="password" type="password" required className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${errors.password ? InputStyles.errors : InputStyles.normal}`} name="password" ref={register(inputsControls.password)} />
                            </div>
                            {errors.password && <label className="text-red-500 text-sm ml-2">{errors.password.message}</label>}
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                                Password confirmation
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input id="password_confirmation" type="password" required className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${errors.password_confirmation ? InputStyles.errors : InputStyles.normal}`} name="password_confirmation" ref={register(inputsControls.password_confirmation)} />
                            </div>
                            {errors.password_confirmation && <label className="text-red-500 text-sm ml-2">{errors.password_confirmation.message}</label>}
                            {errors.password_confirmation && errors.password_confirmation.type === "confirmPassword" && <label className="text-red-500 text-sm">Passwords must match</label>}
                        </div>

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition duration-150 ease-in-out">
                                    Register
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}