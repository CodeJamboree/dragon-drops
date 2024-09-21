import { ConnectDragSource, ConnectDragPreview } from 'react-dnd'

export interface IDraggableContext {
  drag: ConnectDragSource,
  preview: ConnectDragPreview,
  isDragging: boolean
}