import React from "react";
import MainLayout from './Layouts/MainLayout/MainLayout';
import Navbar from './Navbar/Navbar';



export default () => {
    return (
        <MainLayout>
            <Navbar mainColor="orange" colorIntensity="600" />
        </MainLayout>
    )
}