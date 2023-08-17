import { createContext, useEffect, useState } from "react";
import { IGeneralContext, GeneralPropsType } from "./generalTypes";
import { IErrorLertData, IFormLogin, IOpenClose, IOrder, IProduct, ISebdOrder } from "@/src/types";
import { myApiFetch } from "@/src/hooks/myApiFetch";
import { getLocalStorage, setLocalStorage } from "@/src/hooks/useLocalStorage";
import { isStoreOpenStore } from "@/src/utils/times/isStoreOpenStore";

export const GeneralContext = createContext<IGeneralContext>({} as IGeneralContext);

export const GeneralContextProvider = ({ children }: GeneralPropsType) => {
  const [basketData, setBasketData] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [ordersForAdmin, setOrdersForAdmin] = useState<ISebdOrder[]>([]);
  const [openClose, setOpenClose] = useState<IOpenClose>({ message: "", isOpen: false, open: "", close: "" });
  const [errorAlertData, setErrorAlertData] = useState<IErrorLertData>({ message: "", type: "" });
  const [jwtToken, setJwtToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allowedDistance, setAllowedDistance] = useState({ allowedDistance: 0, message: "" });

  useEffect(() => {
    start();
    const interval = setInterval(() => {
      getOpenClose();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const setErrorAlert = ({ message, type }: any) => {
    setErrorAlertData({ message, type });
    setTimeout(() => setErrorAlertData({ message: "", type: "" }), 4000);
  };

  const start = () => {
    setJwtToken(getLocalStorage("jwt") ?? "");
    getOpenClose();
    getOrdersForAdmin();
    getAllowedDistance();
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    setJwtToken(getLocalStorage("jwt") ?? "");
  };

  const getProductsByCategoryId = async (id: number) => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + "/products?category.id=" + id, null, false, (data) =>
        setErrorAlert(data)
      );
      setProducts(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const putProductPauseSell = async (product: IProduct) => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(
        process.env.apiUrl + "/content-manager/collection-types/application::product.product/" + product.id,
        {
          method: "PUT",
          body: product,
        },
        true,
        (data) => setErrorAlert(data)
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCountOrdersForAdmin = async () => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + `/orders/count`, null, true, (data) => setErrorAlert(data));
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getCountOrdersForClient = async (phone: string) => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + `/orders/count?clientPhone=${phone}`, null, true, (data) =>
        setErrorAlert(data)
      );
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersForAdmin = async (page = 1, size = 5) => {
    const start = (page - 1) * size;
    try {
      setIsLoading(true);
      const data = await myApiFetch(
        process.env.apiUrl + `/orders?_limit=${size}&_start=${start}&_sort=created_at:desc`,
        null,
        true,
        (data) => setErrorAlert(data)
      );
      setOrdersForAdmin(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getOpenClose = async () => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + "/open-closeds", null, false, setErrorAlert);
      setOpenClose(data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllowedDistance = async () => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(process.env.apiUrl + "/allowed-distances", null, false, setErrorAlert);
      setAllowedDistance(data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const makeOrder = async (newOrder: ISebdOrder) => {
    try {
      setIsLoading(true);
      await myApiFetch(
        process.env.apiUrl + "/orders",
        {
          method: "POST",
          body: newOrder,
        },
        false,
        setErrorAlert
      );
      await telegramNotification("New order: " + newOrder?.numberOrder);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const telegramNotification = async (message: string) => {
    try {
      const urlApi: string = `https://api.telegram.org/bot${process.env.botToken}/sendMessage`;
      await fetch(urlApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: message,
          chat_id: process.env.chatId,
          parse_mode: "html",
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const updateOrder = async (newOrder: ISebdOrder, id: string) => {
    try {
      setIsLoading(true);
      await myApiFetch(
        process.env.apiUrl + "/orders/" + id,
        {
          method: "PUT",
          body: newOrder,
        },
        false,
        setErrorAlert
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (form: IFormLogin) => {
    try {
      setIsLoading(true);
      const data = await myApiFetch(
        process.env.apiUrl + "/admin/login",
        {
          method: "POST",
          body: form,
        },
        false,
        setErrorAlert
      );
      if (data?.data?.token) {
        setJwtToken(data?.data?.token);
        setLocalStorage("jwt", data?.data?.token);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersByPhone = async (phone: string, page = 1, size = 5) => {
    const start = (page - 1) * size;
    try {
      setIsLoading(true);
      const data = await myApiFetch(
        process.env.apiUrl + `/orders?clientPhone=${phone}&_limit=${size}&_start=${start}&_sort=created_at:desc`,
        null,
        false,
        setErrorAlert
      );
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addOneToBasket = (data: IOrder) => {
    const newBasketData: IOrder[] = [data, ...basketData];
    setBasketData(newBasketData);
  };

  const updateRewriteAllBasket = (data: IOrder[]) => {
    setBasketData(data);
  };

  const removeOneFromBasket = (index: number) => {
    basketData.splice(index, 1);
    setBasketData([...basketData]);
  };

  const clearBasket = () => {
    setBasketData([]);
  };

  const showInfoOpenCloseStore = () => {
    if (openClose.isOpen && isStoreOpenStore(openClose?.open, openClose?.close)) {
      return true;
    }

    setErrorAlert({ message: openClose.message, type: "info" });
    return false;
  };

  return (
    <GeneralContext.Provider
      value={{
        basketData,
        addOneToBasket,
        removeOneFromBasket,
        errorAlertData,
        setErrorAlert,
        updateRewriteAllBasket,
        clearBasket,
        getProductsByCategoryId,
        products,
        showInfoOpenCloseStore,
        openClose,
        makeOrder,
        getOrdersByPhone,
        loginAdmin,
        jwtToken,
        ordersForAdmin,
        getOrdersForAdmin,
        getCountOrdersForAdmin,
        updateOrder,
        getCountOrdersForClient,
        isLoading,
        logOut,
        allowedDistance,
        telegramNotification,
        putProductPauseSell,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
