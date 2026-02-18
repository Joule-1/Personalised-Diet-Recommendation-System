import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const VerifyUserLogIn = () => {
    const { user, setUser } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
};

export default VerifyUserLogIn;
