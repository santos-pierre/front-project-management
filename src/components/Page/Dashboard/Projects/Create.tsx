import React, { useEffect } from 'react';
import ContentLayout from '../Layouts/ContentLayout/ContentLayout';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import FormGroup from './FormGroup';

export default () => {
    useEffect(() => {
        document.title = "Projects - Create";
    }, []);
    return (
        <MainLayout>
            <ContentLayout center={<FormGroup />}></ContentLayout>
        </MainLayout >
    )
}