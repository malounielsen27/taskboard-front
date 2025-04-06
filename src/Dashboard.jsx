import Menu from "./Menu";
import React from "react";
import classes from "./Layout.module.css"; 
import { useAuthContext } from "../Context/AuthContext";

const Dashboard = () => {
const {username}=useAuthContext();
    return (
        <>
            <div className={classes.welcome}>
                <h1 className={classes.welcomeText}>Workspace for {username}</h1></div>
            <Menu />
            
        </>
    )
}

export default Dashboard; 