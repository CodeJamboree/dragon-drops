import { useContext } from "react";
import { DraggableContext } from "./DraggableContext";
import ContextError from "../ContextError";

const useDraggable = () => {
  const context = useContext(DraggableContext);
  if (context === undefined) {
    throw new ContextError('Draggable');
  }
  return context;
};

export default useDraggable;