import React from 'react';
import MainLayout from '../Dashboard/Layouts/MainLayout/MainLayout';
import ProfileForm from './ProfileForm';

const Profile = () => {

    return (
        <MainLayout>
            <div className="md:grid md:grid-cols-3 md:gap-6 px-5 mt-5">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Info</h3>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <ProfileForm />
                </div>
            </div>
            <div className="hidden sm:block">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
            {/* <div className="md:grid md:grid-cols-3 md:gap-6 px-5 mt-5">
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
            </div> */}
        </MainLayout>)
}

export default Profile;