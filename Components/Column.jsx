import React from "react";
import Card from "./Card";
import Droppable from "../dnds/Droppable";
import NewCard from "../src/CreateComponents/newCard";
import { useState } from "react";
import classes from "./Components.module.css"; 

const Column = ({ column }) => { 
    const [showModal, setShowModal] = useState(false); 
    const openModal = () => {
        setShowModal(true); 
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

      
     
    return (
        <>
        <Droppable id={column.id} key={column.id}>
        <div className={classes.column}>
            <div className={classes.columnHeader}>
            <h6 className={classes.columnTitle}>{column.title}</h6>
            <button onClick={openModal} className={classes.createCard}>&#43;</button>
            </div>
            <div className={classes.columnContent}>
            {showModal && <NewCard onClose={closeModal} columnId={column.id} />}
            </div>
            {column.cards ? column.cards.map(card=> <Card key={card.id} card={card}/>):<p>no cards</p>}
        </div>
    </Droppable>
        </>
    )
}

export default Column;