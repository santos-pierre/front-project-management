import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import usersClient from '../../../api/users/usersClient';
import { setCurrentUser } from '../../../redux/user/userAction';
import { RootState } from '../../../types/RooState';
import { UserType } from '../../../types/UserType';
import Button from '../../Button/Button';

type Inputs = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

type ProfileFormProps = {
    handleNotification?: Function
}

const ProfileFormInfo = ({ handleNotification }: ProfileFormProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { handleSubmit, register, getValues, errors, reset } = useForm<Inputs>();
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const dispatch = useDispatch();

    const setUser = useCallback((user: UserType) => {
        dispatch(setCurrentUser(user));
    }, [dispatch]);

    const emailAlreadyTaken = async (email: string) => {
        try {
            const response = await usersClient.emailAlreadyTaken({ email: email });
            return !response.data.alreadyTaken;
        } catch (error) {
            console.log(error);
        }
    }

    const inputStyles = {
        normal: '',
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
            minLength: {
                value: 8,
                message: 'Your password must contains at least 8 characters'
            },
        },
        password_confirmation: {
            validate: {
                confirmPassword: (value: any) => getValues('password') === value,
            }
        }
    };

    const onSubmit = async (data: Inputs) => {
        setLoading(true);
        try {
            const response = await usersClient.updateProfile(data);
            setUser({ ...response.data, isAuthenticated: true });
            if (handleNotification) {
                handleNotification({
                    message: 'Profile Updated !',
                    show: true
                });
            }
            setLoading(false);
            reset({ password: "", password_confirmation: "" })
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <form className="w-full md:max-w-screen-xl md:w-auto mx-auto px-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-7">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">Name</label>
                    <input id="name" className={`${errors.name ? inputStyles.errors : inputStyles.normal} form-input block w-full sm:text-sm sm:leading-5`} name="name" type="text" ref={register(inputsControls.name)} defaultValue={currentUser.name} />
                    {errors.name && <label className="text-red-500 text-sm break-words inline-block md:w-40">{errors.name.message}</label>}
                </div>

                <div>
                    <label htmlFor="email_address" className="block text-sm font-medium leading-5 text-gray-700">Email</label>
                    <input id="email_address" className={`${errors.email ? inputStyles.errors : inputStyles.normal} form-input block w-full sm:text-sm sm:leading-5`} type="email" name="email" ref={register(inputsControls.email)} defaultValue={currentUser.email} />
                    {errors.email && <label className="text-red-500 text-sm ml-2 inline-block w-40 break-words">{errors.email.message}</label>}
                    {errors.email && errors.email.type === "emailAlreadyTaken" && <label className="text-red-500 text-sm break-words inline-block md:w-40">Email already taken</label>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">New Password</label>
                    <input id="password" className={`${errors.password_confirmation || errors.password ? inputStyles.errors : inputStyles.normal} mt-1 form-input block w-full sm:text-sm sm:leading-5`} type="password" placeholder="My new password" name="password" ref={register(inputsControls.password)} />
                    {errors.password && <label className="text-red-500 text-sm break-words inline-block md:w-40">{errors.password.message}</label>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">Confirmation Password</label>
                    <input id="password_confirmation" className={`${errors.password_confirmation || errors.password ? inputStyles.errors : inputStyles.normal} mt-1 form-input block w-full sm:text-sm sm:leading-5`} type="password" placeholder="My new password" name="password_confirmation" ref={register(inputsControls.password_confirmation)} />
                    {(errors.password_confirmation && errors.password_confirmation.type === "confirmPassword") && <label className="text-red-500 text-sm ml-2 inline-block md:w-40 break-words">Passwords must match</label>}
                </div>
            </div>
            <div className="flex mt-5 w-full">
                <Button bgColor="orange" bgColorIntensity="500" bgColorHoverIntensity="400" bgColorFocusIntensity="600" textColor="white" textColorIntensity="600" size="full" textSize="text-sm" type="submit" isLoading={isLoading} disabled={isLoading}>
                    Save
                </Button>
            </div>
        </form>
    )
}

export default ProfileFormInfo;