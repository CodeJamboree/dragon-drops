import { createContext } from "react";
import { IDroppableContext } from "./IDroppableContext";

export const DroppableContext = createContext<IDroppableContext | undefined>(undefined);

