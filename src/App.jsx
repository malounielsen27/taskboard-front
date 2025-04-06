import DashBoard from './DashBoard';
import Board from '../Components/Board'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { DndContext } from '@dnd-kit/core';
import classes from "./Layout.module.css"; 
import AuthProvider from '../Context/AuthContext';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {
  const { handleDrop } = useAppContext(); 

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DndContext onDragEnd={handleDrop}>
            <div className={classes.background}>
            <DashBoard />
            <Board className={classes.board}/>
            </div>
            </DndContext>
          </PrivateRoute>   
          } />
        
      </Routes>
      </Router>
  )
}

export default App; 

