import React, { useEffect, useState } from 'react';
import { NotificationToasterType } from '../../../types/NotificationToasterType';
import NotificationToaster from '../../NotificationToaster/NotificationToaster';
import MainLayout from '../Dashboard/Layouts/MainLayout/MainLayout';
import ProfileFormInfo from './ProfileFormInfo';
import ProfilePhotoUpload from './ProfilePhotoUpload';

const Profile = () => {
    useEffect(() => {
        document.title = 'Projects - Profile';
    }, []);

    const [notification, setNotification] = useState<NotificationToasterType>({
        type: 'success',
        message: '',
        show: false,
    });

    const [profilePicture, setProfilePicture] = useState<File>();

    return (
        <MainLayout>
            <ProfilePhotoUpload handleFile={setProfilePicture} />
            <ProfileFormInfo
                handleNotification={setNotification}
                profilePicture={profilePicture}
            />
            <NotificationToaster notification={notification} />
        </MainLayout>
    );
};

export default Profile;
