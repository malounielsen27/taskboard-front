import React from "react";
import classes from './login.module.css'; 

function Input(props) {
  const { type, name, onChange, placeholder, id, value } = props; // Ta emot props korrekt

  return (
    <div>
      <input className={classes.input}
        type={type}
        name={name} 
        onChange={onChange}
        placeholder={placeholder}
        id={id} 
        value={value} 
      />
    </div>
  );
}

export default Input;
