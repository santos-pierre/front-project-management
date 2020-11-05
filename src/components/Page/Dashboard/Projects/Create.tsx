import React, { useEffect } from 'react';
import ContentLayout from '../Layouts/ContentLayout/ContentLayout';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import FormGroup from './FormGroup';

const CreateProject = () => {
    useEffect(() => {
        document.title = "Projects - Create";
    }, []);
    return (
        <MainLayout>
            <ContentLayout center={<FormGroup />}></ContentLayout>
        </MainLayout >
    )
}

export default CreateProject;