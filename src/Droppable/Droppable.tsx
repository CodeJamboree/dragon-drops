import React, { ReactNode, FC, RefObject, useMemo, useState } from "react"
import { useDrop, XYCoord } from 'react-dnd'

import { DroppableContext } from './DroppableContext.js';
import { IDroppableContext } from "./IDroppableContext.js";
import calcPosition from "./calcPosition.js";
import { DropCollector } from "./DropCollector.js";
import { DropResult } from "../DropResult.js";
import { DragItem } from "../DragItem.js";
import { onDraggedOverHandler } from "./onDraggedOverHandler.js";

export const Droppable: FC<{
  onDraggedOver?: onDraggedOverHandler,
  children: ReactNode,
  item: DragItem,
  accept: string
}> = ({
  children,
  item,
  accept,
  onDraggedOver
}) => {

    const [ref, setRef] = useState<RefObject<any> | null>(null);

    const [{ handlerId }, drop] = useDrop<
      DragItem,
      DropResult,
      DropCollector
    >(() => ({
      accept,
      collect: (monitor): DropCollector => ({
        handlerId: monitor.getHandlerId()
      }),
      drop(dragItem, monitor) {
        if (!monitor.canDrop()) return;
        if (!(ref && ref.current)) return;
        const position = calcPosition(
          ref,
          item,
          dragItem,
          monitor.getClientOffset() as XYCoord
        )
        return { ...item, position };
      },
      hover(dragItem, monitor): void {
        if (!monitor.canDrop()) return;
        if (!(ref && ref.current)) return;
        const position = calcPosition(
          ref,
          item,
          dragItem,
          monitor.getClientOffset() as XYCoord
        )
        onDraggedOver?.(dragItem, { ...item, position });
      }
    }), [accept, item, ref, onDraggedOver]);

    const context = useMemo<IDroppableContext>(() => ({
      handlerId,
      drop,
      setRef
    }), [
      handlerId,
      drop,
      setRef
    ]);

    return (<DroppableContext.Provider value={context} >
      {children}
    </DroppableContext.Provider>
    );
  }