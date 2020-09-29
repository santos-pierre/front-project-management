import React, { useEffect } from "react";
import MainLayout from './Layouts/MainLayout/MainLayout';
import ContentLayout from "./Layouts/ContentLayout/ContentLayout";
import UserInfo from "./UserInfo/UserInfo";
import ProjectsIndex from "./Projects/Index";

export default () => {
    useEffect(() => {
        document.title = "Projects - Dashboard";
    }, []);

    return (
        <MainLayout>
            <ContentLayout left={<UserInfo />} center={<ProjectsIndex />} />
        </MainLayout>
    )
}