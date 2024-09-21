import React, { ReactNode, FC, useEffect, useMemo, useState } from "react"

import { OrderedItem } from "./OrderedItem";
import { OrderableContext } from "./OrderableContext";
import { IOrderableContext } from "./IOrderableContext";
import { OrderableItem } from "./OrderableItem";
import { onDropBuilder } from "./onDropBuilder";
import { onDraggedOverBuilder } from "./onDraggedOverBuilder";
import { onDragCancelBuilder } from "./onDragCancelBuilder";

export const Orderable: FC<{
  items: OrderableItem[],
  canMove?: boolean,
  onChanged?: (items: OrderedItem[]) => void,
  children: ReactNode,
}> = ({
  items,
  canMove = true,
  onChanged,
  children
}) => {

    const [localItems, setLocalItems] = useState(items);
    useEffect(() => setLocalItems(items), [items])

    const onDraggedOver = useMemo(
      () => onDraggedOverBuilder(
        localItems, canMove, setLocalItems
      ),
      [localItems, canMove, setLocalItems]
    );

    const onDrop = useMemo(
      () => onDropBuilder(
        items, localItems, canMove, onChanged
      ),
      [items, localItems, canMove, onChanged]
    );

    const onDragCancel = useMemo(() =>
      onDragCancelBuilder(items, setLocalItems),
      [items, setLocalItems]
    );

    const context = useMemo<IOrderableContext<OrderableItem>>(
      () => ({
        items: localItems,
        onDragCancel,
        onDrop,
        onDraggedOver
      }), [
      localItems,
      onDragCancel,
      onDrop,
      onDraggedOver
    ]);

    return (<OrderableContext.Provider value={context} >
      {children}
    </OrderableContext.Provider>
    );

  };