import React, { useEffect, useContext, useState } from "react";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const isProfileUpdated = authCtx.isProfileUpdated;
    const isLoggedIn = authCtx.isLoggedIn;

    useEffect(() => {
        if (isLoggedIn && !isProfileUpdated) {
            toast.info("Please update your profile ");
        }
    }, [isProfileUpdated]);

    return (
        <>
            {!isProfileUpdated && <UpdateProfile />}
        </>
    );
};

export default Dashboard;
