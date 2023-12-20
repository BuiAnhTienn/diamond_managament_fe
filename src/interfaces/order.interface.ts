import { IProduct } from "./product.interface";

export interface IOrder {
  _id: string;
  user: string;
  email: string;
  name: string;
  address: string;
  note: string;
  phone: string;
  status: string;
  createdAt: string;
  item: TProductInOrder[];
}

export type TProductInOrder = {
  product: IProduct;
  quantity: number;
};
