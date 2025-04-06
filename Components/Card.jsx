import React from "react";
import Draggable from '../dnds/Draggable';
import classes from "./Components.module.css"; 

const Card = ({ card }) => {


    return (
        <>
        <Draggable id={card.id} key={card.id}>
            <div className={classes.card}>
            <button className={classes.closeButton}>
         &times;
        </button>
                <div className={classes.cardHeader}>
            <div>{card.title}</div>
            </div>
            <p>{card.description}</p>
            </div>
        </Draggable>
        </>
        
    )
}

export default Card;