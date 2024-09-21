import { ConnectDropTarget } from "react-dnd";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface IDroppableContext {
  handlerId: any,
  drop: ConnectDropTarget,
  setRef: Dispatch<SetStateAction<RefObject<any> | null>>
}