import React from "react";
import classes from "./Layout.module.css"; 
import { useAppContext } from "../Context/AppContext";
import { useEffect, useState} from "react";
import NewBoard from "./CreateComponents/newBoard";
import { useAuthContext } from "../Context/AuthContext";


const Menu = () => {
    const {boardMenu, setBoardMenu, getBoard}= useAppContext(); 
    const {token}=useAuthContext();
    const [showModal, setShowModal] = useState(false); 

  const openModal = () => {
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false);
  };

    const getMenu=async()=>{
        try {
          const response=await fetch('http://localhost:5097/api/Board',{
          method: "GET",
          headers: {
            'Accept': '*/*',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  
          },
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data= await response.json();
        setBoardMenu(data);
      } catch(error){
        console.log(error);
      }

    }

   useEffect(()=>{
        getMenu(); 
    },[]); 
   
    return (
        <div className={classes.menu}>
          <div className={classes.menuHeader}>
          <h3>Menu</h3>
          <button onClick={openModal} className={classes.createBoardButton}>&#43;</button>
          </div>
          {showModal && <div><NewBoard onClose={closeModal} /></div>}
             <ul className={classes.menuList}>
             {boardMenu ? (boardMenu.map((board) => (<li key={board.id} className={classes.li} onClick={()=>getBoard(board.id)}>{board.title}</li>))
        ) : (
          <></>
        )}
        </ul>
        </div>
    );
    }

    export default Menu;