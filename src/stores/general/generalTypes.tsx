import { IErrorLertData, IFormLogin, IHeader, IOpenClose, IOrder, IProduct, ISebdOrder } from "@/src/types";
export interface IGeneralContext {
  basketData: IOrder[];
  addOneToBasket: (data: IOrder) => void;
  updateRewriteAllBasket: (data: IOrder[]) => void;
  removeOneFromBasket: (index: number) => void;
  clearBasket: () => void;
  errorAlertData: IErrorLertData;
  setErrorAlert: (data: IErrorLertData) => void;
  getProductsByCategoryId: (id: number) => void;
  products: IProduct[];
  showInfoOpenCloseStore: () => boolean;
  openClose: IOpenClose;
  makeOrder: (newOrder: ISebdOrder) => Promise<void>;
  updateOrder: (newOrder: ISebdOrder, id: string) => Promise<void>;
  getOrdersByPhone: (phone: string, page?: number, size?: number) => Promise<ISebdOrder[]>;
  loginAdmin: (data: IFormLogin) => void;
  jwtToken: string;
  ordersForAdmin: ISebdOrder[];
  getOrdersForAdmin: (page?: number, size?: number) => void;
  getCountOrdersForAdmin: () => Promise<number>;
  getCountOrdersForClient: (phone: string) => Promise<number>;
  isLoading: boolean;
  logOut: () => void;
  allowedDistance: { message: string; allowedDistance: number };
  telegramNotification: (numberOrder: string) => Promise<void>;
  putProductPauseSell: (product: IProduct) => void;
}

export type GeneralPropsType = {
  children: React.ReactNode;
};
