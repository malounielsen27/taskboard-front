import React from "react";
import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";


const NewBoard=({onClose})=>{
  const[form, setForm]=useState(null); 
  const {createBoard}=useAppContext(); 


  const handleChange=(e)=>{
    setForm(e.target.value); 
  }

  const handleCreate = async () => {
      try {
        await createBoard(form);
        onClose();
      } catch (error) {
        console.error("Error creating board:", error);
      }
  };

    return (
          <div style={modalStyles.modal}>
           <button
      onClick={onClose}
      style={modalStyles.closeButton}>
      &times;
    </button>
          <div style={modalStyles.create}>
          <input style={modalStyles.input} type="text" onChange={handleChange} name="boardTitle" placeholder="Board title"/>
          <button style={modalStyles.createButton} onClick={handleCreate}>Skapa</button>
          </div>
          </div>
      );
    };
    
    const modalStyles = {
      modal: {
        fontFamily: "Arial, sans-serif",
        backgroundColor: "transparent",
        borderRadius: "10px",
        width: "97%",
        height: "50px",
        color: "black",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }, input:{
        width: "80%",
        borderRadius: "3px",
        border: "0.01em solid black",
      }, closeButton:{
        background: "transparent",
        border: "none",
        color: "white",
        cursor: "pointer",
        zIndex: 1000, 
        marginLeft: "90%",
        fontSize: "20px",
      }, createButton:{
        backgroundColor: "rgb(141, 141, 141)",
        color: "white",
        border: "none",
        borderRadius: "5px",
        width: "20%",
        padding: "5px",
        cursor: "pointer",
      }, create:{
        display: "flex",
        flexDirection: "row",
      }
    };
    
    export default NewBoard;