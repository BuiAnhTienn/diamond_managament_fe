import { privateInstance } from "@axios/axios";
import { ChartOption } from "@constants/ChartOption";
import { GetQuery } from "@interfaces/getQuery";
import { IOrder } from "@interfaces/order.interface";
import queryString from "query-string";

const baseOrder = "/order";

export const userCreateOrder = async (payload: {
  name: string;
  address: string;
  phone: string;
  email: string;
  note: string;
}) => {
  const result = await privateInstance.post(`${baseOrder}`, payload);
  return result.data;
};

export const getOrderById = async (id: string) => {
  const result = await privateInstance.get(`${baseOrder}/${id}`);
  return result.data as IOrder;
};

export const getOrderHistory = async () => {
  const result = await privateInstance.get(`${baseOrder}/me`);
  return result.data;
};

export const getOrderList = async () => {
  const result = await privateInstance.get(`${baseOrder}`);
  return result.data;
};

interface IOrderAdminQuery extends GetQuery {}

export const getOrderListAdmin = async (query?: IOrderAdminQuery) => {
  const { ...rest } = query;
  delete rest?.totalItem;
  const queryParams = queryString.stringify(rest);
  const result = await privateInstance.get(`${baseOrder}?${queryParams}`);
  return result.data;
};

export const editOrder = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const result = await privateInstance.patch(`${baseOrder}/${id}`, { status });
  return result.data as IOrder;
};

export interface StaticQuery {
  fromDate?: Date;
  toDate?: Date;
  formAtTime?: ChartOption;
}

export const statistic = async (query: StaticQuery) => {
  const queryParams = queryString.stringify(query);
  const result = await privateInstance.get(
    `${baseOrder}/statistic?${queryParams}`
  );
  return result.data as {
    totalPrice?: number;
    total_price?: number;
    date?: string;
    month?: string;
    year?: string;
  }[];
};
