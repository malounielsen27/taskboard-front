import Menu from "./Menu";
import React from "react";
import classes from "./Layout.module.css"; 
import { useAuthContext } from "../Context/AuthContext";

const Dashboard = () => {
const {username, logout}=useAuthContext();

    return (
        <>
            <div className={classes.welcome}>
                <div className={classes.headercontainer}>
                <h1 className={classes.welcomeText}>Workspace for {username}</h1>
                <button className={classes.logoutButton} onClick={logout}>Logout</button>
                </div>
                </div>
            <Menu />
            
        </>
    )
}

export default Dashboard; 