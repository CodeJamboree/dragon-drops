import { DragSourceMonitor } from "react-dnd";
import { DragItem } from "../DragItem";
import { DropResult } from "../DropResult";

export default (
  item: DragItem,
  onDragCancel: ((dragitem: DragItem) => void) | undefined,
  onDrop: ((dragitem: DragItem, dropResult: DropResult) => void) | undefined
) => (
  draggedItem: DragItem,
  monitor: DragSourceMonitor<DragItem, DropResult>
) => {
    if (!draggedItem || !monitor.getDropResult()) {
      onDragCancel?.(item);
    }
    const dropResult = monitor.getDropResult();
    if (!dropResult) {
      return onDragCancel?.(item);
    }

    onDrop?.(item, dropResult);
  }