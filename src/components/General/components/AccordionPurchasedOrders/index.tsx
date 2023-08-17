import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsIcon from "@mui/icons-material/Payments";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { IOrder, ISebdOrder } from "@/src/types";
import { useReactToPrint } from "react-to-print";
import { addMinutes, differenceInSeconds, format, parseISO } from "date-fns";
import plLocale from "date-fns/locale/pl";

interface Props {
  item: ISebdOrder;
}

export const AccordionPurchasedOrders = ({ item }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const receiptRef = useRef(null);
  const initialDate = new Date(item.created_at ?? "");

  const [remainingMinutes, setRemainingMinutes] = useState(0);

  useEffect(() => {
    const calculateRemainingMinutes = () => {
      const targetDate = addMinutes(initialDate, Number(item?.minutes ?? 20));
      const remainingSeconds = Math.max(differenceInSeconds(targetDate, new Date()), 0);
      return Math.max(Math.ceil(remainingSeconds / 60), 0);
    };

    setRemainingMinutes(calculateRemainingMinutes());

    const interval = setInterval(() => {
      setRemainingMinutes((prevRemainingMinutes) => {
        if (prevRemainingMinutes <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevRemainingMinutes - 1;
      });
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [item?.minutes]);

  const handlePrint = useReactToPrint({
    content: () => receiptRef?.current,
  });

  return (
    <Accordion className="mb-2" expanded={isExpanded} ref={receiptRef}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between w-full mr-2 items-center">
          <div className="flex flex-col">
            <div className="flex">
              <h2 className="mb-2 text-sm font-semibold text-gray-900 ">{item?.address?.name}</h2>
              <h2
                className={`mb-2 ml-4  text-[14px] ${
                  item?.isDelivered || item?.statusOrder === "Anulować"
                    ? "text-gray-300"
                    : item?.statusOrder !== "Nie potwierdzony"
                    ? "text-[#1976d2]"
                    : "text-red-500"
                }`}
              >
                {item?.statusOrder === "Anulować" ? "Anulowanie" : item?.statusOrder}!
              </h2>
            </div>
            <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside ">
              <li className="capitalize flex items-center">
                {item?.address?.orderMethod === "delivery" ? (
                  <DeliveryDiningIcon className="mr-1" />
                ) : (
                  <DirectionsRunIcon className="mr-1" />
                )}
                {item?.address?.orderMethod}
                {item?.address?.payMethod === "card" ? (
                  <CardGiftcardIcon className="ml-1 mr-2" />
                ) : (
                  <PaymentsIcon className="ml-1 mr-2" />
                )}
                PLN {item?.totalCost}
              </li>
              <li className="capitalize text-xs">
                <span>N #{item?.numberOrder} </span>
                <span className="ml-2">
                  data {format(parseISO(item?.created_at ?? ""), "d MMMM  HH:mm", { locale: plLocale })}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <AccessTimeIcon className="mb-2 text-[#1976d2]" />
            <span>{remainingMinutes} M</span>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col">
          <h2 className="mb-2 text-lg font-semibold text-gray-900 ">Szczegóły zamówienia</h2>
          {item?.order?.map((order: IOrder, index: number) => {
            return (
              <div className="ml-2" key={index}>
                <ul className="space-y-4 text-gray-500 list-none list-inside ">
                  <li className="capitalize">
                    <div className="flex justify-between">
                      <span>
                        {order?.count}x {order?.title}
                      </span>
                      <span>{order?.cost},00 zł</span>
                    </div>
                    <ol className="pl-5 mt-2 space-y-1 list-inside">
                      {order?.sauce ? (
                        <li className="capitalize">
                          <div className="flex justify-between">+ {order?.sauce}</div>
                        </li>
                      ) : (
                        ""
                      )}
                      {order?.meat ? (
                        <li className="capitalize">
                          <div className="flex justify-between">+ {order?.meat}</div>
                        </li>
                      ) : (
                        ""
                      )}
                      {order?.size?.title ? (
                        <li className="capitalize">
                          <div className="flex justify-between">
                            + {order?.size?.title} <span>{order?.size?.cost},00 zł</span>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}

                      {order?.additions?.length
                        ? order?.additions?.map((addition, index: number) => {
                            return (
                              <li className="capitalize" key={index}>
                                {" "}
                                <div className="flex justify-between">
                                  <span>+ {addition?.title}</span>
                                  <span>{addition?.cost},00 zł</span>
                                </div>
                              </li>
                            );
                          })
                        : ""}

                      {order?.note ? <li className="capitalize">Note: {order?.note}</li> : ""}
                    </ol>
                  </li>
                </ul>
              </div>
            );
          })}
          <ul className="space-y-4 text-gray-500 list-none list-inside  mt-10 border-t-2 pt-3">
            <li>
              <div className="capitalize flex items-center">
                {item?.address?.payMethod === "card" ? (
                  <CardGiftcardIcon className="ml-1 mr-2" />
                ) : (
                  <PaymentsIcon className="ml-1 mr-2" />
                )}
                Online
              </div>
              <ol className="pl-5 mt-2 space-y-1  list-inside">
                <li>
                  <div className="flex justify-between">
                    <span>suma częściowa</span>
                    <span>{item?.totalCost},00 zł</span>
                  </div>
                </li>
                <li>
                  {item?.address?.orderMethod === "delivery" && (
                    <div className="flex justify-between">
                      <span>koszt dostawy</span>
                      <span>{item?.payDelivery ?? 0},00 zł</span>
                    </div>
                  )}
                </li>
                <li>
                  <div className="flex justify-between">
                    <span>Rezem</span>
                    <span>{item?.totalCost},00 zł</span>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between capitalize text-blue-600 cursor-pointer">
                    <span onClick={handlePrint}>Wydrukować zamówienie</span>
                  </div>
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
