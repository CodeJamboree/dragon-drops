import React, { ReactNode, FC, useMemo } from "react"
import { useDrag } from "react-dnd";

import { DragItem } from "../DragItem.js";
import { DropResult } from "../DropResult.js";

import { DragCollector } from "./DragCollector.js"
import { DraggableContext } from './DraggableContext.js';
import { IDraggableContext } from "./IDraggableContext.js";
import collect from "./collect.js";
import endBuilder from "./endBuilder.js";
import { onDropHandler } from "./onDropHandler.js";
import { onDragCancelHandler } from "./onDragCancelHandler.js";

export const Draggable: FC<{
  onDragCancel?: onDragCancelHandler,
  onDrop?: onDropHandler,
  children: ReactNode,
  type: string,
  item: DragItem,
  dropEffect?: 'move' | 'copy'
}> = ({
  onDragCancel,
  onDrop,
  children,
  type,
  item,
  dropEffect = 'move'
}) => {
    const [
      { isDragging },
      drag,
      preview
    ] = useDrag<
      DragItem, DropResult, DragCollector
    >(() => ({
      type,
      item,
      options: { dropEffect },
      collect,
      end: endBuilder(item, onDragCancel, onDrop),
    }),
      [item, type, dropEffect, onDrop, onDragCancel]
    );

    const context = useMemo<IDraggableContext>(() => ({
      drag, preview, isDragging
    }),
      [drag, preview, isDragging]
    );

    return (
      <DraggableContext.Provider value={context} >
        {children}
      </DraggableContext.Provider>
    );
  }