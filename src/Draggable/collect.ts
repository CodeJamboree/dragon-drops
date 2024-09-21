import { DragSourceMonitor } from "react-dnd";
import { DragItem } from "../DragItem";
import { DropResult } from "../DropResult";
import { DragCollector } from "./DragCollector";

export default (
  monitor: DragSourceMonitor<DragItem, DropResult>
): DragCollector => ({
  isDragging: monitor.isDragging()
});
