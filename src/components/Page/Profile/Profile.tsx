import React, { useState } from 'react';
import { NotificationToasterType } from '../../../types/NotificationToasterType';
import NotificationToaster from '../../NotificationToaster/NotificationToaster';
import MainLayout from '../Dashboard/Layouts/MainLayout/MainLayout';
import ProfileFormInfo from './ProfileFormInfo';

const Profile = () => {
    const [notification, setNotification] = useState<NotificationToasterType>({
        show: false,
        message: ''
    })

    return (
        <MainLayout>
            <div className="flex justify-center mt-5 ali">
                {/* image container */}
                <div className="h-32 w-32 relative">
                    <label htmlFor="photo" className="inline-block rounded-full overflow-hidden bg-gray-100 shadow-lg hover:opacity-75 cursor-pointer">
                        <svg className="h-full w-full text-gray-300 hover:opacity-75" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </label>
                    <label htmlFor="photo" className="h-6 w-6 bg-orange-500 rounded-full absolute right-4 bottom-0 shadow-md text-white cursor-pointer hover:bg-orange-400">
                        <svg className="w-6 h-6 p-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    </label>
                    <input type="file" name="photo" id="photo" className="hidden" />
                </div>
            </div>
            <ProfileFormInfo handleNotification={setNotification} />
            <NotificationToaster notification={notification} />
        </MainLayout>)
}

export default Profile;