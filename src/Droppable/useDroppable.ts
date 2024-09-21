import { useContext } from "react";
import { DroppableContext } from "./DroppableContext";
import ContextError from "../ContextError";

const useDroppable = () => {
  const context = useContext(DroppableContext);
  if (context === undefined) {
    throw new ContextError('Droppable');
  }
  return context;
};

export default useDroppable;