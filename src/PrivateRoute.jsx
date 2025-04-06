import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const PrivateRoute=({children})=>{
    const { token } = useAuthContext(); 


    return(
        token ? children : <Navigate to="/" />
    );
}

export default PrivateRoute;