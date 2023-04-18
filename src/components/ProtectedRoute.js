import React, { Children } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {


        return <Navigate to='/' />

    return children;
};