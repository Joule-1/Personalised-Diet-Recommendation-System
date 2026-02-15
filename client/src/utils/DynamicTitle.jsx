import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const titleName = {
            "/": "Home",
            "/signin": "SignIn",
            "/signup": "SignUp",
            "/privacy": "Privacy Policy",
            "/tos": "Terms Of Service",
        };

        document.title =
            `${titleName[location.pathname] === undefined ? "PDRS" : `${titleName[location.pathname]} - PDRS`}` ||
            "PDRS";
    }, [location.pathname]);

    return null;
};

export default DynamicTitle;
