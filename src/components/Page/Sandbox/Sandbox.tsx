import React from 'react';
import { useForm } from 'react-hook-form';
// import usersClient from '../../../api/users/usersClient';

type Inputs = {
    name: string;
    email: string;
    files: FileList;
    photo: File;
};

const SandBoxProfileForm = () => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        data.photo = data.files[0];
        try {
            // const response = await usersClient.updateProfile(data);
        } catch (error) {}
    };

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name" className="block">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-input"
                    ref={register}
                />
            </div>
            <div>
                <label htmlFor="email" className="block">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-input"
                    ref={register}
                />
            </div>
            <div>
                <label className="block text-sm font-medium leading-5 text-gray-700">
                    Photo
                </label>
                <div className="flex items-center mt-2">
                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                        <svg
                            className="w-full h-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <span className="ml-5 rounded-md">
                        <input
                            type="file"
                            name="files"
                            id="files"
                            className="hidden"
                            ref={register}
                        />
                        <label
                            htmlFor="files"
                            className="px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md cursor-pointer hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                        >
                            Change
                        </label>
                    </span>
                </div>
            </div>
            <button
                type="submit"
                className="px-3 py-2 m-3 text-white bg-black rounded"
            >
                Send
            </button>
        </form>
    );
};

export default SandBoxProfileForm;
