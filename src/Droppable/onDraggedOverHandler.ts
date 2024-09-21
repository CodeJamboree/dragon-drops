import { DragItem } from "../DragItem";
import { DropResult } from "../DropResult";

export interface onDraggedOverHandler {
  (dragItem: DragItem, dropResult: DropResult): void
}