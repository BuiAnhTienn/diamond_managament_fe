import { privateInstance } from "@axios/axios";
import { Gender } from "@constants/Gender";
import { GetQuery } from "@interfaces/getQuery";
import { IProduct } from "@interfaces/product.interface";
import queryString from "query-string";

const baseProduct = "/product";

export interface ICreateProductPayload {
  name: string;
  price: number;
  description: string;
  image: string[];
  isTrending: boolean;
  subCategory: string;
  material: string;
  gender: Gender;
  size: number;
  promotion: number;
}

export interface IProductQuery extends GetQuery {
  trending?: boolean;
  category?: string;
  subCategory?: string;
  fromPrice?: number;
  toPrice?: number;
}

interface IProductRes {
  docs: IProduct[];
  total: number;
  page: number;
  limit: number;
  search: string;
}

export const getProduct = async (query?: IProductQuery) => {
  delete query?.totalItem;
  const { ...rest } = query;
  const queryParams = queryString.stringify(rest);
  const result = await privateInstance.get(`${baseProduct}?${queryParams}`);
  return result.data as IProductRes;
};

export const getProductById = async (id: string) => {
  const result = await privateInstance.get(`${baseProduct}/${id}`);
  return result.data as IProduct;
};

export const createProduct = async (payload: ICreateProductPayload) => {
  const result = await privateInstance.post(`${baseProduct}/`, payload);
  return result.data as IProduct;
};

export const deteleProduct = async ({ id }: { id: string }) => {
  const result = await privateInstance.delete(`${baseProduct}/${id}`);
  return result.data as IProduct;
};

export const updateProduct = async ({
  id,
  product,
}: {
  id: string;
  product: ICreateProductPayload;
}) => {
  try {
    const response = await privateInstance.put(`${baseProduct}/${id}`, product);
    return response.data;
  } catch (error) {}
};

export const updateTrending = async ({
  id,
  isTrending,
}: {
  id: string;
  isTrending: boolean;
}) => {
  try {
    const response = await privateInstance.put(`${baseProduct}/${id}`, {
      isTrending,
    });
    return response.data;
  } catch (error) {}
};
