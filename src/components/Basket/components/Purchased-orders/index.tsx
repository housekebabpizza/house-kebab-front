import { ListItemText, Stack, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { IFormAddress, ISebdOrder } from "@/src/types";
import { useGeneral } from "@/src/hooks/useGeneral";
import { useSocket } from "@/src/hooks/useSocket";
import { getLocalStorage } from "@/src/hooks/useLocalStorage";
import { AccordionPurchasedOrders } from "@/src/components/General/components/AccordionPurchasedOrders";

export function PurchasedOrders() {
  const [orders, setOrders] = useState<ISebdOrder[]>();
  const { getOrdersByPhone, getCountOrdersForClient } = useGeneral();
  const { confirmsOrderData } = useSocket();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getPurchasedOrders(confirmsOrderData.phone, 1, 4);
  }, [confirmsOrderData]);

  useEffect(() => {
    const address: IFormAddress = getLocalStorage("address");
    const phone = address?.phone?.slice(3, 12);
    getPurchasedOrders(phone, 1, 4);
    getCountPage(phone);
  }, []);

  const getPurchasedOrders = async (phone: string, page?: number, size?: number) => {
    if (!phone) return;
    const data = await getOrdersByPhone(phone, page, size);
    setOrders(data);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const address: IFormAddress = getLocalStorage("address");
    const phone = address?.phone?.slice(3, 12);
    getPurchasedOrders(phone, value, 4);
    setPage(value);
  };

  const getCountPage = async (phone: string) => {
    if (!phone) return;
    const count = await getCountOrdersForClient(phone);
    setCount(count);
  };

  return (
    <>
      {orders?.length ? (
        <div className="w-full p-4 md:p-10">
          {orders?.map((item: ISebdOrder, index: number) => (
            <AccordionPurchasedOrders item={item} key={index} />
          ))}
        </div>
      ) : (
        <ListItemText primary="Nie masz jeszcze zamówienia!" className="text-center text-red-400 cursor-pointer" />
      )}
      <div className="mt-auto">
        {count > 3 && (
          <Stack spacing={2}>
            <Pagination count={Math.ceil(count / 4)} page={page} onChange={handleChange} />
          </Stack>
        )}
      </div>
    </>
  );
}
