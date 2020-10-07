import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import usersClient from '../../../api/users/usersClient';
import MainLayout from '../Dashboard/Layouts/MainLayout/MainLayout';

const Profile = () => {
    const { register, handleSubmit } = useForm();

    const [profilePhoto, setProfilephoto] = useState<any>();
    const [previewProfilePhoto, setPreviewProfilePhoto] = useState<string>();

    const onSubmitProfile = async (data: any) => {
        data.photo = profilePhoto;
        console.log(data);
        try {
            const response = await usersClient.updateProfile(data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmitPasswordChange = (data: any) => {
        console.log('hello');
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setProfilephoto(e.target.files[0]);
            setPreviewProfilePhoto(URL.createObjectURL(file));
        }
    }

    return (
        <MainLayout>
            <div className="md:grid md:grid-cols-3 md:gap-6 px-5 mt-5">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Info</h3>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit(onSubmitProfile)} encType="multipart/form-data">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                            Name
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input id="name" className="form-input flex-1 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="Name" name="name" ref={register} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6 mt-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                            Email
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input id="email" className="form-input flex-1 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" name="email" placeholder="youremail@email.com" type="email" ref={register} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm leading-5 font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center">
                                        {!previewProfilePhoto ?
                                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </span>
                                            :
                                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200" style={{ backgroundImage: `url(${previewProfilePhoto})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>

                                            </span>
                                        }

                                        <span className="ml-5 rounded-md">
                                            <input type="file" name="photo" id="photo" className="hidden" ref={register} multiple={false} onChange={onChange} />
                                            <label htmlFor="photo" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer">
                                                Change
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <span className="inline-flex rounded-md shadow-sm">
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out">
                                        Save
                                    </button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden sm:block">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
            <div className="md:grid md:grid-cols-3 md:gap-6 px-5 mt-5">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Change password</h3>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit(onSubmitPasswordChange)}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input id="password" className="form-input flex-1 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="My current password" type="password" name="password" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6 mt-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                                            Password Confirmation
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input id="password_confirmation" name="password_confirmation" className="form-input flex-1 block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="My new password" type="password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <span className="inline-flex rounded-md shadow-sm">
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out">
                                        Save
                                </button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>)
}

export default Profile;