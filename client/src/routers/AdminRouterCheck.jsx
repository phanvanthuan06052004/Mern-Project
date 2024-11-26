import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const AdminRouterCheck = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/admin/login" />

    return children ? children : <Outlet />; //outlet is a placeholder for the child routes 
}

export default AdminRouterCheck
