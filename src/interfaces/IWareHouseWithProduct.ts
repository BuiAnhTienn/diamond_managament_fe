import { IProduct } from './product.interface';

export interface IProductInWarehouse {
  _id?: string;
  quantity: number;
  product: IProduct;
}
