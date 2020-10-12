import React, { useState, FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersClient from '../../../api/users/usersClient';
import { setCurrentUser } from '../../../redux/user/userAction';
import { RootState } from '../../../types/RooState';
import { UserType } from '../../../types/UserType';
import ProfilePhotoUpload from './ProfilePhotoUpload';

type Errors = {
    name: Array<string>,
    email: Array<string>,
    photo: Array<string>,
}

const ProfileForm = () => {
    const inputStyles = {
        normal: '',
        errors: 'focus:border-red-300 shadow-outline-red focus:shadow-outline-red border-red-300'
    }

    const dispatch = useDispatch();

    const setUser = useCallback((user: UserType) => {
        dispatch(setCurrentUser(user));
    }, [dispatch]);

    const user: UserType = useSelector((state: RootState) => state.user.currentUser);

    const [file, setFile] = useState<File>();
    const [errors, setErrors] = useState<Errors>();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        let formData = new FormData(e.currentTarget);
        if (file) {
            formData.append('file', file, file.name);
        }
        try {
            const response = await usersClient.updateProfile(formData);
            console.log(response);
            setUser({ ...response.data, isAuthenticated: true });
            setLoading(false);
        } catch (error) {
            if (error.status === 422) {
                setErrors(error.data.errors);
            }
            setLoading(false);
        }

    }

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit} id="profileForm">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                Name
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input id="name" className={`${errors?.name && inputStyles.errors} form-input block w-full sm:text-sm sm:leading-5`} placeholder="Name" name="name" defaultValue={user.name} />
                            </div>
                            {errors?.name && <label className="text-red-500 text-sm ml-2">{errors.name[0]}</label>}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                Email
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <input id="email" className={`${errors?.email && inputStyles.errors} form-input block w-full sm:text-sm sm:leading-5`} name="email" placeholder="youremail@email.com" type="email" defaultValue={user.email} />
                            </div>
                            {errors?.email && <label className="text-red-500 text-sm ml-2">{errors.email[0]}</label>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <ProfilePhotoUpload handleFile={setFile} error={errors?.photo[0]} photo={user.photo} />
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <span className="inline-flex rounded-md shadow-sm">
                        <button type="submit" disabled={isLoading} className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out">
                            Save
                            <svg className={`animate-spin h-5 w-5 text-white inline ml-2 ${isLoading ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
        </form>
    )
}

export default ProfileForm;