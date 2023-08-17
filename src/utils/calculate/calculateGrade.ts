import { getLocalStorage, setLocalStorage } from "@/src/hooks/useLocalStorage";
import { IOrder } from "@/src/types";

export const calculateGrade = (order: IOrder[]) => {
  const grade = getLocalStorage("grade") || [];
  const orderIds = order.map((item) => item?.id);
  setLocalStorage("grade", [...grade, ...orderIds]);
};
