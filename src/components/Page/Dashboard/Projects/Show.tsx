import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projectsClient from "../../../../api/projects/projectsClient";
import { ProjectType } from "../../../../types/ProjectType";
import Loading from "../../../Loading/Loading";
import ContentLayout from "../Layouts/ContentLayout/ContentLayout";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import ProjectInfo from "./ProjectInfo";
import Index from "./Tasks/Index";


const ShowProject = () => {
    type Param = {
        slug: string
    }
    const { slug } = useParams<Param>();
    const [project, setProject] = useState<ProjectType>({ title: " ", slug: " ", author: " ", description: " ", deadline: 0, repository_url: "", status: "" });
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
        document.title = "Projects - Show";
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
    }, [slug])

    return (
        <MainLayout>
            <ContentLayout left={isLoading ? <Loading /> : <ProjectInfo project={project} />} center={<Index />}></ContentLayout>
        </MainLayout >
    )
}

export default ShowProject;