import React from "react";
import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import classes from "./Layout.module.css";


const Login=()=>{

const [form, setForm]=useState({
  username: "",
  password: ""
}); 
const {login}=useAuthContext();
const navigate=useNavigate();

const handleChange=(e)=>{
   setForm((prevForm)=>({
    ...prevForm, 
    [e.target.name]: e.target.value
   }))};
   
   const UserLogin = async () => {
    const { username, password } = form; 
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      const response = await fetch("http://localhost:5097/api/Auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
  
      if (data) {
        login(data);
        navigate("/dashboard");  
      } else {
        alert("Login failed"); 
      }
      } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    }
  };

  const UserRegister =async()=>{
    if(!form.username || !form.password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      const response = await fetch("http://localhost:5097/api/Auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const data = await response.json();
  
      if (data) {
        alert("Registration successful, please login"); 
      } else {
        alert("Registration failed"); 
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    }
  }
 
return(
    <div className={classes.login}>
    <div className={classes.loginForm}>
    <input className={classes.input} type="text" name="username" onChange={handleChange} placeholder="Username" id="username"/>
    <input className={classes.input} type="password" name="password" onChange={handleChange} placeholder="Password" id="password"/>
    <div className={classes.buttons}>
    <button onClick={UserLogin}>Login</button>
    <button onClick={UserRegister}>Register</button>
    </div>
    </div>
</div>
);
}

export default Login;