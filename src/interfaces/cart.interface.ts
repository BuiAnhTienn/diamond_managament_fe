import { IProduct } from './product.interface';

export interface ICart {
  _id: string;
  user?: string;
  item: TProductInCart[];
}

export type TProductInCart = {
  product: IProduct;
  quantity: number;
};
