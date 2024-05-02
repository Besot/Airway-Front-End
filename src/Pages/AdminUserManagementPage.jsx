import AdminUserSideBar from "../Components/AdminUserSideBar/AdminUserSideBar.jsx";
import AdminUserNavBar from "../Components/AdminUserNavBar/AdminUserNavBar.jsx";
import AdminDashboardUser from "../Components/AdminDashboardUser/AdminDashboardUser.jsx";
import React from "react";

function AdminUserManagementPage () {
    return (
        <>
            <AdminUserSideBar/>
            <AdminDashboardUser />
        </>

    )
}

export default AdminUserManagementPage