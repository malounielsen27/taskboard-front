import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import Column from "./Column";
import classes from "./Components.module.css"; 
import { useState } from "react";
import NewColumn from "../src/CreateComponents/newColumn";
import { useAuthContext } from "../Context/AuthContext";


const Board=()=>{
const {board, setBoard, getBoard, getStartBoard} = useAppContext(); 
const [showModal, setShowModal] = useState(false); 
const {token}=useAuthContext(); 

useEffect(() => {
    getStartBoard();
  }, [token]);

      const openModal = () => {
          setShowModal(true); 
        };
      
        const closeModal = () => {
          setShowModal(false);
        };

    return(
        <div>
        <div className={classes.boardHeader}>
        <h2 className={classes.boardTitle}>{board.title}</h2> 
        <button onClick={openModal} className={classes.createColumn}>&#43;</button>
        </div>
        {showModal && <NewColumn onClose={closeModal} />}
        <div className={classes.board}>
            {board ? (<>
            {board.columns? board.columns.map(column => <Column key={column.id} column={column} />):<p>No columns</p>}
            </>)
            
            : <h2>Loading...</h2>}

            </div>
            </div>
    )
}

export default Board;