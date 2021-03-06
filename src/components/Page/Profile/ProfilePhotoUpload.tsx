import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RooState';
import {ReactComponent as Logo} from '../../../assets/img/profile_svg.svg';

type ProfilePhotoUploadProps = {
    handleFile: Function
}

const ProfilePhotoUpload = ({ handleFile }: ProfilePhotoUploadProps) => {
    const currenUser = useSelector((state: RootState) => state.user.currentUser);
    const [preview, setPreview] = useState<string|null>(null);
    const [file, setFile] = useState<File>();

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setPreview(imageURL);
            setFile(e.target.files[0]);
            handleFile(e.target.files[0]);
        }
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center mt-5">
                <div className="relative">
                    {
                        (currenUser.photo !== null && !preview) ?
                            <label htmlFor="photo">
                                <img src={`${currenUser.photo}`} alt=" " className={`${(file && !['image/png', 'image/jpeg'].includes(file.type)) && 'border border-red-500 shadow-outline-red '} h-32 w-32 inline-block rounded-full overflow-hidden bg-gray-100 shadow-lg hover:opacity-75 cursor-pointer`} />
                            </label>
                            :
                            <label htmlFor="photo" className="h-32 w-32 inline-block rounded-full overflow-hidden bg-gray-100 shadow-lg hover:opacity-75 cursor-pointer">
                                {preview ? 
                                    <img src={`${preview}`} alt=" " className={`${(file && !['image/png', 'image/jpeg'].includes(file.type)) && 'border border-red-500 shadow-outline-red '} h-32 w-32 inline-block rounded-full overflow-hidden bg-gray-100 shadow-lg hover:opacity-75 cursor-pointer`} />
                                :
                                    <Logo className="h-full w-full text-gray-300 hover:opacity-75"/>
                                }
                            </label>
                    }
                    <label htmlFor="photo" className="h-6 w-6 bg-orange-500 rounded-full absolute right-4 bottom-0 shadow-md text-white cursor-pointer hover:bg-orange-400">
                        <svg className="w-6 h-6 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    </label>
                    <input type="file" name="photo" id="photo" className="hidden" onChange={(e) => onChange(e)} accept="image/png, image/jpeg" />
                </div>
            </div >
        </div>
    )
}

export default ProfilePhotoUpload;