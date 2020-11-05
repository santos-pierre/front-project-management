import React from 'react';
import { useForm } from 'react-hook-form';
// import usersClient from '../../../api/users/usersClient';

type Inputs = {
    name: string,
    email: string,
    files: FileList,
    photo: File
}

const SandBoxProfileForm = () => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        data.photo = data.files[0];
        try {
            // const response = await usersClient.updateProfile(data);
        } catch (error) {

        }
    }

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name" className="block">
                    Name
                </label>
                <input type="text" name="name" id="name" className="form-input" ref={register} />
            </div>
            <div>
                <label htmlFor="email" className="block">
                    Email
                </label>
                <input type="email" name="email" id="email" className="form-input" ref={register} />
            </div>
            <div>
                <label className="block text-sm leading-5 font-medium text-gray-700" >
                    Photo
                </label >
                <div className="mt-2 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <span className="ml-5 rounded-md">
                        <input type="file" name="files" id="files" className="hidden" ref={register} />
                        <label htmlFor="files" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer">
                            Change
                        </label>
                    </span>
                </div>
            </div>
            <button type="submit" className="px-3 py-2 bg-black text-white rounded m-3">Send</button>
        </form>
    )
}

export default SandBoxProfileForm;