import React from "react";
import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";

const NewCard=({onClose, columnId})=>{
  const[form, setForm]=useState({
    cardTitle: "",
  cardDescription: ""
  }); 
  const {createCard}=useAppContext(); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleCreate = async () => {
    try {
      await createCard(form, columnId)
      onClose();
    } catch (error) {
      console.error("Error creating card:", error);
    }
};
    
    return (
            <div style={modalStyles.modal}>
            <button onClick={onClose} style={modalStyles.closeButton}>
            &times;
            </button>
            <div style={modalStyles.create}>
            <label htmlFor="cardTitle">Card title:</label>
            <input style={modalStyles.input} type="text" onChange={handleChange} name="cardTitle"/>
            <label htmlFor="cardDescription">Card description: </label>
            <input style={modalStyles.input} type="text" onChange={handleChange} name="cardDescription"/>
            <button style={modalStyles.createButton} onClick={handleCreate}>Skapa</button>
            </div>
            </div>
      );
    };
    
    const modalStyles = {
      modal: {
      position: "fixed", 
      top: "50%",         
      left: "50%",       
      transform: "translate(-50%, -50%)",  
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "300px",
      textAlign: "center",
      color: "black",
      zIndex: 1050,
      },input:{
        width: "80%",
        height: "30px",
        borderRadius: "3px",
        border: "0.01em solid black",
      }, closeButton:{
        background: "transparent",
        border: "none",
        color: "black",
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
        margin: "10px",
        cursor: "pointer",
      }, create:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }
    };
    
    export default NewCard;