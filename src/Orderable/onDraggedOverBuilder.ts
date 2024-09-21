import { DragItem } from "../DragItem";
import { DropResult } from "../DropResult";

import { onDraggedOverHandler } from "../Droppable/onDraggedOverHandler";

import { OrderableItem } from "./OrderableItem";

export const onDraggedOverBuilder = (
  localItems: OrderableItem[],
  canMove: boolean,
  setLocalItems: (localItems: OrderableItem[]) => void
): onDraggedOverHandler => {

  const onDraggedOver: onDraggedOverHandler = (
    dragItem: DragItem,
    dropResult: DropResult
  ) => {
    if (!canMove) return;

    if (dragItem.id === dropResult.id) return;
    if (dropResult.position === 'on') return;
    const copy = localItems.slice();
    const dragIndex = copy.findIndex(({ id }) => id === dragItem.id);
    let dropIndex = copy.findIndex(({ id }) => id === dropResult.id);

    const dragged = copy.splice(dragIndex, 1);
    if (dropIndex > dragIndex) dropIndex--;
    if (dropResult.position === 'after') dropIndex++;
    copy.splice(dropIndex, 0, ...dragged);
    setLocalItems(copy);
  };

  return onDraggedOver;
};