import React from "react";
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
const [token,setToken]=useState(null);
const [username, setUsername]=useState(null); 


const login = (data) => {
    setToken(data.token);
    setUsername(data.username);
  };

  const logout = () => {
    setToken(null); 
    setUsername(null);

  };
    return(
        <AuthContext.Provider value={{ token, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    ); 
}
export default AuthProvider;
export const useAuthContext = () => {
    return useContext(AuthContext);
}