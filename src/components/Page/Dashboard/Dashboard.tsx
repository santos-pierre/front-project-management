import React, { useEffect } from "react";
import MainLayout from './Layouts/MainLayout/MainLayout';
import Navbar from './Navbar/Navbar';
import ContentLayout from "./Layouts/ContentLayout/ContentLayout";
import UserInfo from "./UserInfo/UserInfo";
import ProjectsIndex from "./Projects/Index";

export default () => {
    useEffect(() => {
        document.title = "Projects - Dashboard";
    }, []);

    return (
        <MainLayout>
            <Navbar mainColor="orange" colorIntensity="600" />
            <ContentLayout left={<UserInfo />} center={<ProjectsIndex />} />
        </MainLayout>
    )
}