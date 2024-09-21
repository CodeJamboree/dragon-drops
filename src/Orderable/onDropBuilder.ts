import { onDropHandler } from "../Draggable/onDropHandler";
import { OrderableItem } from "./OrderableItem";
import { OrderedItem } from "./OrderedItem";

export const onDropBuilder = (
  items: OrderableItem[],
  localItems: OrderableItem[],
  canMove: boolean,
  onChanged?: (changes: OrderedItem[]) => void
): onDropHandler => {

  const onDrop: onDropHandler = () => {
    if (!canMove) return;
    const changes = localItems.map<OrderedItem>(
      ({ id }, index) => ({
        id,
        order: index + 1
      })).filter((order, index) => {
        const old = items[index];
        return order.id !== old.id ||
          order.order !== old.order;
      })
    if (changes.length === 0) return;

    onChanged?.(changes);
  }

  return onDrop;
};