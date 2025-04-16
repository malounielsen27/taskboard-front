import React, { createContext, useContext, useState } from "react";
import {useAuthContext} from "./AuthContext";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [board, setBoard] = useState([]);
  const [boardMenu, setBoardMenu]= useState([]); 
  const {token}=useAuthContext();

  const getBoard=async(id)=>{
    try{
     const response= await fetch(`http://localhost:5097/api/Board/${id}`, {
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
      setBoard(data);
    } catch(Error){
      console.log(Error); 
    }
  };

  const getStartBoard=async()=>{
    setBoard([]);
    try{
     const response= await fetch("http://localhost:5097/api/Board/first-board", {
        method: "GET",
        headers: {
         'Accept': '*/*',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`   
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP errr! Status: ${response.status}`);
      }
      const data= await response.json();
      setBoard(data);
    } catch(Error){
      console.log(Error); 
    }
  }

  /**
   * Hanterar kortet som släpps
   */
  const handleDrop = async (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    try{
    const response= await fetch(`http://localhost:5097/api/Card/${active.id}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardId: active.id,
        newColumnId: over.id,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update the card');
    }
    const data= await response.json();
    updateCardInColumn(data);
  } catch (error) {
        console.error('Error:', error);
      }
    }
   
/**
 *Används av handledrop för att uppdater i statet board. 
 */
 const updateCardInColumn = (data) => {
  var updateColumn=board.columns.map((column) => {
    const updatedCards = column.cards
      .filter(card => card.id !== data.id)  
      .concat(column.id === data.columnId ? [data] : []);
    return {
      ...column, 
      cards: updatedCards  
    };
  })
  const updatedBoard={
  ...board, 
  columns: updateColumn
  }; 
  setBoard(updatedBoard); 
};

const createBoard=async(boardTitle)=>{
  try {
    const response = await fetch('http://localhost:5097/api/Board',{
      method: 'POST',
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  
      },
      body: JSON.stringify({
        title: boardTitle,
      }),
    }); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setBoardMenu(prevBoards => [...prevBoards, {
      id: data.id,
      title: data.title
    }]);
    
  } catch (error) {
   console.log(error); 
  }
};

const createColumn=async(title)=>{
  try {
    const response = await fetch('http://localhost:5097/api/Column',{
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        boardId: board.id
      }),
    }); 

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setBoard(prevBoard => ({
      ...prevBoard,
      columns: [...prevBoard.columns, { id: data.id, title: data.title, cards: [], boardId: prevBoard.id }]
    }));
  } catch (error) {
   console.log(error); 
  }
};

const createCard=async(form, columnId)=>{
  try {
    const response = await fetch('http://localhost:5097/api/Card',{
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          title: form.cardTitle,
          description: form.cardDescription,
          columnId: columnId
      }),
    }); 

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setBoard(prevBoard => ({
      ...prevBoard,
      columns: prevBoard.columns.map(column => 
        column.id === data.columnId
          ? { ...column, cards: [...column.cards, data] } 
          : column  
      )
    }));
  } catch (error) {
   console.log(error); 
  }
};



  const contextValues = {
    board,
    setBoard,
    handleDrop,
    boardMenu,
    setBoardMenu,
    getBoard,
    createBoard,
    createColumn,
    createCard,
    getStartBoard
  };
  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
}
export default ContextProvider;
export const useAppContext = () => useContext(AppContext);