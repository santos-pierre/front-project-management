import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import usersClient from '../../../api/users/usersClient';
import { setCurrentUser } from '../../../redux/user/userAction';
import { RootState } from '../../../types/RooState';
import { UserType } from '../../../types/UserType';
import ButtonForm from '../../ButtonForm/ButtonForm';
import InputForm from '../../InputForm/InputForm';

type Inputs = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    photo: File;
};

type ProfileFormProps = {
    handleNotification: Function;
    profilePicture?: File;
};

const ProfileFormInfo = ({
    handleNotification,
    profilePicture,
}: ProfileFormProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        register,
        getValues,
        errors,
        reset,
        setError,
    } = useForm<Inputs>();
    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );

    const dispatch = useDispatch();

    const setUser = useCallback(
        (user: UserType) => {
            dispatch(setCurrentUser(user));
        },
        [dispatch]
    );

    const inputStyles = {
        normal: '',
        errors:
            'focus:border-red-300 shadow-outline-red focus:shadow-outline-red border-red-300',
    };

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
        },
        password: {
            minLength: {
                value: 8,
                message: 'Your password must contains at least 8 characters',
            },
        },
        password_confirmation: {
            validate: {
                confirmPassword: (value: any) =>
                    getValues('password') === value,
            },
        },
    };

    const onSubmit = async (data: Inputs) => {
        setLoading(true);
        let formDatas = new FormData();
        formDatas.append('name', data.name);
        formDatas.append('email', data.email);
        formDatas.append('password', data.password);
        formDatas.append('password_confirmation', data.password_confirmation);
        if (profilePicture) {
            formDatas.append('photo', profilePicture, profilePicture.name);
        }

        try {
            const response = await usersClient.updateProfile(formDatas);
            setUser({ ...response.data, isAuthenticated: true });
            handleNotification({
                message: 'Profile Updated !',
                show: true,
                type: 'success',
            });
            setLoading(false);
            reset({ password: '', password_confirmation: '' });
        } catch (error) {
            setLoading(false);
            if (error.status === 422 && error.data.errors.photo) {
                handleNotification({
                    message: error.data.errors.photo[0],
                    show: true,
                    type: 'danger',
                });
            } else if (error.status === 422 && error.data.errors.email) {
                setError('email', {
                    message: error.data.errors.email[0],
                });
            }
        }
    };

    return (
        <form
            className="w-full px-5 mx-auto md:max-w-screen-xl md:w-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-7">
                <InputForm
                    name="name"
                    type="text"
                    label="Name"
                    ref={register(inputsControls.name)}
                    error={errors.name && errors.name.message}
                    defaultValue={currentUser.name}
                />
                <InputForm
                    name="email"
                    type="text"
                    label="Email"
                    ref={register(inputsControls.email)}
                    error={errors.email && errors.email.message}
                    defaultValue={currentUser.email}
                />

                <InputForm
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="new password"
                    additionaleWrapperClass="break-all w-fuul md:w-60"
                    ref={register(inputsControls.password)}
                    error={errors.password && errors.password.message}
                />

                <InputForm
                    name="password_confirmation"
                    type="password"
                    label="Password Confirmation"
                    placeholder="new password"
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
            </div>
            <div className="flex w-full mt-5">
                <ButtonForm
                    text="Save"
                    colorClass="bg-primary"
                    isLoading={isLoading}
                    additionalClass="focus:ring-2 focus:ring-teal-300"
                />
            </div>
        </form>
    );
};

export default ProfileFormInfo;
