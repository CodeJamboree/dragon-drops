import { OrderableItem } from "./OrderableItem";
import { onDropHandler } from "../Draggable/onDropHandler";
import { onDragCancelHandler } from "../Draggable/onDragCancelHandler";
import { onDraggedOverHandler } from "../Droppable/onDraggedOverHandler";

export interface IOrderableContext<T extends OrderableItem> {
  items: T[],
  onDraggedOver: onDraggedOverHandler,
  onDrop: onDropHandler,
  onDragCancel: onDragCancelHandler
}