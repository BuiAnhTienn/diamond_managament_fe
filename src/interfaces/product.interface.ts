import { Gender } from "@constants/Gender";
import { ISubCategory } from "./ISubCategory";

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  image: string[];
  description: string;
  isTrending: boolean;
  subCategory: ISubCategory;
  material: string;
  gender: Gender;
  size: number;
  quantity?: number;
  promotion?: number;
}

export interface IProductInCartPayload {
  product: string;
  quantity: number;
}
