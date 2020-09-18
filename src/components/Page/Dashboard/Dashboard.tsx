import React from "react";
import MainLayout from './Layouts/MainLayout/MainLayout';
import Navbar from './Navbar/Navbar';
import ContentLayout from "./Layouts/ContentLayout/ContentLayout";
import UserInfo from "./UserInfo/UserInfo";
import ProjectsIndex from "./Projects/ProjectsIndex";



export default () => {
    return (
        <MainLayout>
            <Navbar mainColor="orange" colorIntensity="600" />
            <ContentLayout left={<UserInfo />} center={<ProjectsIndex />} />
        </MainLayout>
    )
}