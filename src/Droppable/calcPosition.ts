import { RefObject } from "react";
import { XYCoord } from "react-dnd";
import { DragItem } from "../DragItem";

export default (
  ref: RefObject<any>,
  dropItem: DragItem,
  dragItem: DragItem,
  pointer: XYCoord
) => {

  if (!ref.current) return 'on';

  switch (dragItem.index) {
    case dropItem.index: return 'on';
    case dropItem.index - 1: return 'after';
    case dropItem.index + 1: return 'before';
    default: break;
  }

  const { top, bottom } = ref.current.getBoundingClientRect();
  const height = bottom - top;
  const y = pointer.y - top;
  const isTopHalf = y < height * 0.5;

  return isTopHalf ? 'before' : 'after';
}