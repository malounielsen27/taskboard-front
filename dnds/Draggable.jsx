import {useDraggable} from '@dnd-kit/core';
import React from 'react';

const Draggable=({id, children})=>{
    const {attributes, listeners, setNodeRef,transform}=useDraggable({id}); 

   const styles={
        cursor: "grab",
        userSelect: "none",
        opacity: 1,
        transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`
    }; 

    return React.cloneElement(children, {
      ref: setNodeRef,
      style: { ...styles, ...children.props.style },
      ...listeners,
      ...attributes,
    });
  }
export default Draggable; 