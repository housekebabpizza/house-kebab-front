export interface ICategory {
  type: string;
  isAddition: boolean;
  title: string;
  id: number;
}

export interface IAddition {
  cost: number;
  isChoosed: boolean;
  title: string;
}

export interface IFreeSauces {
  title: string;
  id: string;
}
export interface IMeats {
  meat: string;
  id: string;
}
export interface IDiscount {
  title: string;
  discountCost: number;
  id: string;
}

export interface ISize {
  title: string;
  id: string | null;
  cost: number;
}

export interface IOpenClose {
  message: string;
  isOpen: boolean;
  open: string;
  close: string;
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: { url: string };
  category: ICategory;
  additions?: Array<IAddition>;
  sauce?: string;
  free_sauces: IFreeSauces[];
  sizes: ISize[];
  meats: IMeats[];
  discount: IDiscount;
  isPauseSell: boolean | null;
}

export interface IOrder {
  title: string;
  sauce: string | undefined;
  count: number;
  additions?: IAddition[];
  cost: number;
  category: ICategory;
  id: string;
  note?: string;
  size: ISize;
  meat: string;
  totalCost: number;
  discount: IDiscount;
}

export interface IFormAddress {
  name: string;
  phone: string;
  street: string;
  home: string;
  apartment: string;
  entrance: string;
  orderMethod: string;
  payMethod: string;
  disstance: number;
}
export interface IFormLogin {
  email: string;
  password: string;
}

export interface ISebdOrder {
  address: IFormAddress;
  numberOrder: string;
  order: IOrder[];
  totalCost: number;
  clientPhone: string;
  created_at?: string;
  statusOrder?: string;
  isDelivered?: boolean;
  minutes?: string;
  id?: string;
  payDelivery: number;
}

export interface IConfirmsOrder {
  minutes: string;
  statusOrder: string;
  isDelivered: boolean;
}

export interface IOrders {
  address: IFormAddress;
  numberOrder: string;
  order: IOrder[];
  totalCost: Number;
}

export interface IHeader {
  logo: string;
  banner: string;
}

export interface IErrorLertData {
  message: string;
  type: string;
}
