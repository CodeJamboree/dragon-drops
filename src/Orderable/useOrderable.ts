import { useContext } from "react";
import { OrderableContext } from "./OrderableContext";
import { IOrderableContext } from "./IOrderableContext";
import { OrderableItem } from "./OrderableItem";
import ContextError from "../ContextError";

const useOrderable = <T extends OrderableItem = OrderableItem>() => {
  const context = useContext(OrderableContext);
  if (context === undefined) {
    throw new ContextError('Orderable');
  }
  return context as IOrderableContext<T>;
};

export default useOrderable;