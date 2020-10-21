import React, { ChangeEvent } from 'react';

type ProfilePhotoUploadProps = {
    handleFile: Function,
    handlePreview: Function,
    preview: string
    error?: string,
    photo?: string
}

const ProfilePhotoUpload = ({ handleFile, error, photo, handlePreview, preview }: ProfilePhotoUploadProps) => {

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageURL = URL.createObjectURL(e.target.files[0]);
            handlePreview(imageURL);
            handleFile(e.target.files[0]);
        }
    }

    const reset = () => {
        handlePreview('');
        handleFile(null);
    }

    return (
        <>
            <label className="block text-sm leading-5 font-medium text-gray-700" >
                Photo
            </label >
            <div className="mt-2 flex flex-col space-y-3">
                {
                    photo === null && !preview ?
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        :
                        <div className="flex items-center space-x-2">
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200" style={{ backgroundImage: `url('${preview ? preview : photo}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></span>
                            {
                                (preview) &&
                                <button className="inline-flex p-1 items-center border border-red-500 text-sm leading-4 font-medium rounded-md text-red-500 bg-white-600 hover:bg-red-500 focus:outline-none focus:border-red-500 focus:shadow-outline-indigo active:bg-red-700 transition ease-in-out duration-150 hover:text-white focus:text-white" type="button" onClick={reset}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                                </button>
                            }
                        </div>
                }
                <span className="rounded-md">
                    <input type="file" name="photo" id="photo" className="hidden" onChange={onChange} />
                    <label htmlFor="photo" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out cursor-pointer">
                        Change
                    </label>
                </span>
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </>
    )
}

export default ProfilePhotoUpload;