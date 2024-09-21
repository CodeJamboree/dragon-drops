import { DragItem } from "../DragItem";
import { DropResult } from "../DropResult";

export interface onDropHandler {
  (dragitem: DragItem, dropResult: DropResult): void
}