import { privateInstance } from '@axios/axios';
import { IWarehouse } from '@interfaces/IWarehouse';
import { GetQuery } from '@interfaces/getQuery';
import queryString from 'query-string';

const warehouseUrl = `/warehouse`;

const productInWarehouseUrl = `/product-warehouse`;

export interface IProductQuery extends GetQuery {}

export interface IProductInWarehouseQuery extends GetQuery {
  warehouse?: string;
}

export const getWareHouse = async (query?: IProductQuery) => {
  const { ...rest } = query;
  delete rest?.totalItem;
  const queryParams = queryString.stringify(rest);

  const result = await privateInstance.get(`${warehouseUrl}?${queryParams}`);

  return result.data;
};

export const getWareHouseById = async (id: string) => {
  const result = await privateInstance.get(`${warehouseUrl}/${id}`);

  return result.data;
};

// product in warehouse

export const getProductsInWarehouse = async (
  query: IProductInWarehouseQuery
) => {
  const { ...rest } = query;
  delete rest?.totalItem;
  const queryParams = queryString.stringify(rest);
  const result = await privateInstance.get(
    `${productInWarehouseUrl}?${queryParams}`
  );

  return result.data;
};

export const addProductToWarehouse = async (payload: {
  product: string;
  quantity: number;
  warehouse: string;
}) => {
  const result = await privateInstance.post(
    `${productInWarehouseUrl}`,
    payload
  );

  return result.data;
};

export const editWarehouse = async ({
  id,
  name,
  address,
  description,
}: {
  id: string;
  name: string;
  address: string;
  description: string;
}) => {
  const result = await privateInstance.put(`${warehouseUrl}/${id}`, {
    name,
    address,
    description,
  });
  return result.data as IWarehouse;
};

export const createWarehouse = async ({
  name,
  address,
  description,
}: {
  name: string;
  address: string;
  description: string;
}) => {
  const result = await privateInstance.post(`${warehouseUrl}/`, {
    name,
    address,
    description,
  });
  return result.data as IWarehouse;
};

export const deleteWarehouse = async (id: string) => {
  const result = await privateInstance.delete(`${warehouseUrl}/${id}`);
  return result.data;
};

export const deleteProductInWarehouse = async ({
  productId,
  warehouseId,
}: {
  productId: string;
  warehouseId: string;
}) => {
  const result = await privateInstance.delete(
    `${productInWarehouseUrl}/${productId}/${warehouseId}`
  );
  return result;
};
