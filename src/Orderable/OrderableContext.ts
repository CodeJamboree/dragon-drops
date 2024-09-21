import { createContext } from "react";
import { IOrderableContext } from "./IOrderableContext";
import { OrderableItem } from "./OrderableItem";

export const OrderableContext = createContext<
  IOrderableContext<OrderableItem> | undefined
>(undefined);

