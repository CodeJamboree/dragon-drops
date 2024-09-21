import { onDragCancelHandler } from "../Draggable/onDragCancelHandler";
import { OrderableItem } from "./OrderableItem";

export const onDragCancelBuilder = (
  items: OrderableItem[],
  setLocalItems: (localItems: OrderableItem[]) => void
): onDragCancelHandler => {

  const onDragCancel: onDragCancelHandler = () => {
    setLocalItems(items);
  };

  return onDragCancel;
};