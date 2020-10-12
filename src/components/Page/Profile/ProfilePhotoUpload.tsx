import React, { ChangeEvent, useState } from 'react';

type ProfilePhotoUploadProps = {
    handleFile: Function,
    error?: string,
    photo?: string
}

const ProfilePhotoUpload = ({ handleFile, error, photo }: ProfilePhotoUploadProps) => {

    const [preview, setPreview] = useState<string>();

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setPreview(imageURL);
            handleFile(e.target.files[0]);
        }
    }
    return (
        <>
            <label className="block text-sm leading-5 font-medium text-gray-700" >
                Photo
            </label >
            <div className="mt-2 flex items-center">
                {
                    photo === null && !preview ?
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        :
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200" style={{ backgroundImage: `url('${preview ? preview : photo}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></span>
                }
                <span className="ml-5 rounded-md">
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