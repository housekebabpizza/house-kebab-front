import { useGeneral } from "@/src/hooks/useGeneral";
import { IOrder } from "@/src/types";
import { Button, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import FormAddress from "../Form-address";
import { BasketCard } from "../Basket-card";

function calculateCost(basketData: IOrder[]) {
  return basketData?.reduce((accumulator: number, currentValue: IOrder) => {
    return Math.floor(accumulator + currentValue?.totalCost * currentValue?.count);
  }, 0);
}

export function ProcessBuying({ changeValueTab }: any) {
  const { basketData, updateRewriteAllBasket, removeOneFromBasket, showInfoOpenCloseStore } = useGeneral();
  const [cost, setCost] = useState(0);
  const [openFormAdderss, setOpenFormAdderss] = useState(false);
  const [isPayDelivery, setIsPayDelivery] = useState(false);

  useEffect(() => {
    setCost(calculateCost(basketData));
  }, [basketData]);

  const addOneMoreOrder = (index: number) => {
    basketData[index].count += 1;
    updateRewriteAllBasket([...basketData]);
  };

  const removeOneMoreOrder = (index: number) => {
    if (basketData[index].count === 1) removeOneFromBasket(index);
    else {
      basketData[index].count -= 1;
      updateRewriteAllBasket([...basketData]);
    }
  };

  const changePayDelivery = (isPay: boolean) => {
    setIsPayDelivery(isPay);
  };

  return (
    <div>
      {basketData?.length ? (
        <div className="flex">
          <div className={`${openFormAdderss ? "flex" : "hidden"} md:flex w-full`}>
            <FormAddress
              cost={cost}
              setOpenFormAdderss={setOpenFormAdderss}
              changeValueTab={changeValueTab}
              changePayDelivery={changePayDelivery}
            />
          </div>

          <div
            className={`w-full h-full md:min-h-[90vh] md:w-[40%] overflow-y-hidden px-5 py-5 mb-[160px] md:mb-0 md:border-l-2 flex flex-col justify-between relative ${
              openFormAdderss ? "hidden md:flex" : "flex"
            }`}
          >
            <div className="flex flex-col w-full h-full mb-[200px] md:mb-10 overflow-y-auto">
              {basketData?.map((order: IOrder, index: number) => (
                <BasketCard
                  key={order?.id + index}
                  order={order}
                  addOneMoreOrder={addOneMoreOrder}
                  removeOneMoreOrder={removeOneMoreOrder}
                  index={index}
                />
              ))}
            </div>
            <div className="flex flex-col fixed bottom-[60px] md:bottom-0 md:relative w-full bg-white right-0 px-5 h-[110px] md:h-[50px]">
              <div className="flex justify-between">
                <span>koszt dostawy {cost < 40 ? "(Poniżej 40,00 zł)" : ""}</span>
                <span>{isPayDelivery ? 5 : 0},00 zł</span>
              </div>
              <div className="flex justify-between">
                <span>Razem</span> <span>{cost + (isPayDelivery ? 5 : 0)},00 zł</span>
              </div>
              <div className="w-full flex justify-end mt-5 md:hidden">
                <Button
                  variant="contained"
                  className="rounded-2xl w-full md:w-[200px] bg-blue-400 py-3 font-black text-sm"
                  onClick={() => showInfoOpenCloseStore() && setOpenFormAdderss(true)}
                >
                  Kasa ({cost} zł)
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ListItemText primary="Brak produkt w koszyku!" className="text-center text-red-400" />
      )}
    </div>
  );
}
