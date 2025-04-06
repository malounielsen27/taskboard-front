import { useDroppable } from "@dnd-kit/core";
import React from "react";


const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return React.cloneElement(children, {
    ref: setNodeRef, 
  });
}

  export default Droppable; 