import React, { useEffect, useContext, useState } from "react";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const isProfileUpdated = authCtx.isProfileUpdated;

    useEffect(() => {
        toast.info("Please update your profile ");
    }, []);

    return (
        <>
            {!isProfileUpdated && <UpdateProfile />}
        </>
    );
};

export default Dashboard;
