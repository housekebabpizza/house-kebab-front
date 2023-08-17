import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 } from "uuid";
import { TextField, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useSocket } from "@/src/hooks/useSocket";
import { useGeneral } from "@/src/hooks/useGeneral";
import { IFormAddress, ISebdOrder } from "@/src/types";
import { getLocalStorage, setLocalStorage } from "@/src/hooks/useLocalStorage";
import { calculateDistance } from "@/src/utils/calculate/calculateDistance";
import { calculateGrade } from "@/src/utils/calculate/calculateGrade";

export interface IFormAddressProps {
  cost: number;
  setOpenFormAdderss: any;
  changeValueTab: (index: number) => void;
  changePayDelivery: (isPay: boolean) => void;
}

export default function FormAddress({
  cost,
  setOpenFormAdderss,
  changeValueTab,
  changePayDelivery,
}: IFormAddressProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    home: "",
    apartment: "",
    entrance: "",
    orderMethod: "delivery",
    payMethod: "cash",
    disstance: 0,
  });
  const [error, setError] = useState<any>();
  const { basketData, clearBasket, showInfoOpenCloseStore, makeOrder, setErrorAlert, allowedDistance } = useGeneral();
  const { sendNewOrder } = useSocket();
  const [isPayDelivery, setIsPayDelivery] = useState(false);

  useEffect(() => {
    const address: IFormAddress = getLocalStorage("address");
    if (address) {
      setForm({
        name: address?.name,
        phone: address?.phone,
        street: address?.street,
        home: address?.home,
        apartment: address?.apartment || "",
        entrance: address?.entrance || "",
        orderMethod: "delivery",
        payMethod: "cash",
        disstance: address?.disstance,
      });
    }
  }, []);

  useEffect(() => {
    const isPay = form?.orderMethod === "delivery" && 40 > cost;
    changePayDelivery(isPay);
    setIsPayDelivery(isPay);
  }, [form?.orderMethod, cost]);

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IFormAddress) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!/^\+48\d{9}$/.test(form?.phone)) {
      setError((pre: any) => ({ ...pre, phone: true }));
      return;
    }

    const disstance: number = await calculateDistance(form);

    if (form.orderMethod === "pickup" || (disstance < allowedDistance?.allowedDistance ?? 4)) {
      const order: ISebdOrder = {
        order: basketData,
        address: { ...form, disstance },
        totalCost: cost + (isPayDelivery ? 5 : 0),
        numberOrder: `${v4()?.slice(0, 6)}`,
        clientPhone: form?.phone?.slice(3, 12),
        payDelivery: isPayDelivery ? 5 : 0,
      };
      const isAgree = getLocalStorage("cookie-consent");
      isAgree && setLocalStorage("address", form);
      await makeOrder(order);
      calculateGrade(basketData);
      setErrorAlert({ message: "Dziękujemy za zakup prosimy czekać na potwierdzenie zamówienia", type: "success" });
      changeValueTab(1);
      setTimeout(() => {
        setOpenFormAdderss(false);
        clearBasket();
        setForm({
          name: "",
          phone: "",
          street: "",
          home: "",
          apartment: "",
          entrance: "",
          orderMethod: "delivery",
          payMethod: "cash",
          disstance: 0,
        });
      }, 800);
      sendNewOrder(order?.clientPhone);
    } else {
      setErrorAlert({
        message: allowedDistance?.message,
        type: "error",
      });
    }
  };

  const handleChangeCheckboxOrderMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IFormAddress) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handleChangeCheckboxPayMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IFormAddress) => ({ ...pre, [event.target.name]: event.target.value }));
  };

  const handleBlur = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    const phoneRegex = /^\+48\d{9}$/;
    if (name === "phone" && !phoneRegex.test(value)) setError((pre: any) => ({ ...pre, [name]: true }));
    else if (event.target.required) {
      setError((pre: any) => ({ ...pre, [name]: !value }));
    }
  };

  return (
    <div className="p-5 w-full pb-20 md:pb-0">
      <form onSubmit={(event) => showInfoOpenCloseStore() && handleSubmit(event)}>
        <ArrowBackIcon onClick={() => setOpenFormAdderss(false)} className="cursor-pointer flex md:hidden" />
        <div className="flex flex-col sm:flex-row mt-2 mb-10 justify-between">
          <h1 className="text-xl sm:text-2xl">Wybierz sposób odbioru zamówienia</h1>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="delivery"
            name="orderMethod"
            onChange={handleChangeCheckboxOrderMethod}
          >
            <div className="flex">
              <FormControlLabel value="delivery" control={<Radio />} label="Dostawa" />
              <FormControlLabel value="pickup" control={<Radio />} label="Odbiór" />
            </div>
          </RadioGroup>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 gap-3 md:mt-5">
          <TextField
            id="outlined-basic"
            label="Imię"
            name="name"
            variant="outlined"
            className="mb-5"
            required
            error={error?.name}
            value={form?.name}
            onChange={handleChangeTextField}
            type="name"
            onBlur={handleBlur}
            helperText={error?.name ? "Wartość nie może być pusta" : ""}
          />
          <div className="p-1 md:p-0 block md:hidden"></div>
          <TextField
            id="outlined-basic"
            label="Numer telefonu"
            name="phone"
            variant="outlined"
            className="mb-5"
            required
            error={error?.phone}
            value={form?.phone}
            onChange={handleChangeTextField}
            type="phone"
            onBlur={handleBlur}
            helperText={error?.phone ? "Twój numer telefonu musi być +48727266092" : ""}
          />
          <div className="p-1 md:p-0 block md:hidden"></div>
        </div>
        {form?.orderMethod === "delivery" && (
          <>
            <div className="grid md:grid-cols-2 md:gap-6 gap-3 md:mt-5">
              <TextField
                id="outlined-basic"
                label="Ulica"
                name="street"
                variant="outlined"
                className="mb-5"
                required
                error={error?.street}
                value={form?.street}
                onChange={handleChangeTextField}
                type="street"
                onBlur={handleBlur}
                helperText={error?.street ? "Wartość nie może być pusta" : ""}
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
              <TextField
                id="outlined-basic"
                label="Numer Dom"
                name="home"
                variant="outlined"
                className="mb-5"
                required
                error={error?.home}
                value={form?.home}
                onChange={handleChangeTextField}
                type="home"
                onBlur={handleBlur}
                helperText={error?.home ? "Wartość nie może być pusta" : ""}
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6 gap-3 md:mt-5">
              <TextField
                id="outlined-basic"
                label="Mieszkanie"
                name="apartment"
                variant="outlined"
                className="mb-5"
                value={form?.apartment}
                onChange={handleChangeTextField}
                type="apartment"
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
              <TextField
                id="outlined-basic"
                label="Klatka"
                name="entrance"
                variant="outlined"
                className="mb-5"
                value={form?.entrance}
                onChange={handleChangeTextField}
                type="entrance"
              />
              <div className="p-1 md:p-0 block md:hidden"></div>
            </div>
          </>
        )}

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="cash"
          name="payMethod"
          onChange={handleChangeCheckboxPayMethod}
          className="-mt-5"
        >
          <div className="flex md:mt-5 items-center">
            <h1 className="text-base mr-3">Forma płatności</h1>
            <FormControlLabel value="cash" control={<Radio />} label="Gotówka" />
            {/* <FormControlLabel value="card" control={<Radio />} label="Karta" /> */}
          </div>
        </RadioGroup>

        <div className="w-full flex md:justify-end mt-3">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Zamawiam i płacę z ( {cost + (isPayDelivery ? 5 : 0)},00 zł )
          </button>
        </div>
      </form>
    </div>
  );
}
