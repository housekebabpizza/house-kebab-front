import { Dispatch, SetStateAction } from "react";

export interface ISocketContext {
  sendConfirmsOrder: (phone: string, minutes: string, statusOrder: string) => void;
  sendNewOrder: (phone: string) => void;
  confirmsOrderData: { phone: string; minutes: string; statusOrder: string };
  setConfirmsOrderData: Dispatch<SetStateAction<{ phone: string; minutes: string; statusOrder: string }>>;
  newOrderData: string;
  setNewOrderOrderData: Dispatch<SetStateAction<string>>;
}

export type SocketPropsType = {
  children: React.ReactNode;
};
