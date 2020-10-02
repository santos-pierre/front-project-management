import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import projectsClient from '../../../../api/projects/projectsClient';
import { ProjectType } from '../../../../types/ProjectType';
import Loading from '../../../Loading/Loading';
import ContentLayout from '../Layouts/ContentLayout/ContentLayout';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import FormGroup from './FormGroup';

export default () => {
    type Param = {
        slug: string
    }
    const { slug } = useParams<Param>();
    const [project, setProject] = useState<ProjectType | undefined>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        document.title = "Projects - Edit";

        const getProject = async (slug: string) => {
            try {
                const response = await projectsClient.show(slug);
                setProject(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getProject(slug);
    }, [slug]);

    return (
        <MainLayout>
            <ContentLayout center={isLoading ? <Loading /> : <FormGroup edit project={project} />}></ContentLayout>
        </MainLayout >
    )
}