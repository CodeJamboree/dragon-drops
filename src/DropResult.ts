import { DropPosition } from "./DropPosition";
import { DragItem } from "./DragItem";

export interface DropResult extends DragItem {
  position: DropPosition
};
