import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { IOrder } from "@/src/types";
import { useGeneral } from "@/src/hooks/useGeneral";
export interface IProductCardProps {
  order: IOrder;
  addOneMoreOrder: (index: number) => void;
  removeOneMoreOrder: (index: number) => void;
  index: number;
}

export function BasketCard({ order, addOneMoreOrder, removeOneMoreOrder, index }: IProductCardProps) {
  const { basketData, updateRewriteAllBasket } = useGeneral();
  const [isNote, setIsNote] = useState(false);
  const [noteValue, setNoteValue] = useState<any>({ note: "" });

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteValue({ [event.target.name]: event.target.value });
    order.note = event.target.value;
  };

  const handleSaveNote = () => {
    const index = basketData.findIndex((item: IOrder) => item?.id === order?.id);
    basketData.splice(index, 1, order);
    updateRewriteAllBasket([...basketData]);
    setIsNote(false);
  };

  return (
    <div className="my-6 border-gray-200 dark:border-gray-700 lg:my-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-black">
          {order?.count} {order?.title}
        </h1>
        <span className="font-black">{Math.floor(order?.totalCost * order?.count)} zł</span>
      </div>
      <p className="ml-2 mt-1">{order?.sauce ? order?.sauce : order?.category?.title}</p>
      <div className="flex flex-row ml-2 mt-1 items-center">
        {!isNote && (
          <span className="cursor-pointer" onClick={() => setIsNote(true)}>
            {noteValue?.note ? noteValue?.note?.slice(0, 25) : "Dodaj notatkę"}
          </span>
        )}

        {isNote && (
          <div className="border-2 p-1 flex">
            <input
              value={noteValue?.note}
              className="p-0 outline-none"
              onChange={handleChangeTextField}
              onBlur={handleSaveNote}
              name="note"
            />
            <div className="cursor-pointer">
              <SaveAsIcon onClick={handleSaveNote} />
            </div>
          </div>
        )}

        <div className="flex ml-auto items-center">
          <RemoveIcon
            className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer mr-2"
            onClick={() => removeOneMoreOrder(index)}
          />
          <AddIcon
            className="bg-slate-100 hover:bg-slate-200 w-[40px] h-[40px] z-0 rounded-full p-1 cursor-pointer"
            onClick={() => addOneMoreOrder(index)}
          />
        </div>
      </div>
    </div>
  );
}
