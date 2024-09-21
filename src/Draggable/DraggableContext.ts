import { createContext } from "react";
import { IDraggableContext } from "./IDraggableContext";

export const DraggableContext = createContext<IDraggableContext | undefined>(undefined);

