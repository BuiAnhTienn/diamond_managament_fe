import { privateInstance } from '@axios/axios';
import { GetQuery } from '@interfaces/getQuery';
import queryString from 'query-string';
import { ISubCategory } from '@interfaces/ISubCategory';

const baseSubCategory = '/sub-category';

interface ISubCategoryQuery extends GetQuery {}

export const getSubCategoryList = async (query?: ISubCategoryQuery) => {
  const { ...rest } = query;
  delete rest?.totalItem;
  const queryParams = queryString.stringify(rest);
  const result = await privateInstance.get(`${baseSubCategory}?${queryParams}`);
  return result.data.docs as ISubCategory[];
};

export const getSubCategoryListAdmin = async (query?: ISubCategoryQuery) => {
  const { ...rest } = query;
  delete rest?.totalItem;
  const queryParams = queryString.stringify(rest);
  const result = await privateInstance.get(`${baseSubCategory}?${queryParams}`);
  return result.data;
};

export const getSubCategories = async (category?: string) => {
  const result = await privateInstance.get(
    `/sub-category${category && `?category=${category}`}`
  );
  return result.data?.docs as ISubCategory[];
};

export const deleleSubCategories = async (id: string) => {
  const result = await privateInstance.delete(`/sub-category/${id}`);
  return result.data as ISubCategory;
};

export const createSubCategory = async (payload: ISubCategory) => {
  const result = await privateInstance.post(`/sub-category/`, payload);
  return result.data as ISubCategory;
};

export const updateSubCategory = async (payload: {
  subcate: ISubCategory;
  id: string;
}) => {
  const { id, ...rest } = payload;
  const result = await privateInstance.put(`/sub-category/${id}`, {
    ...rest.subcate,
  });
  return result.data as ISubCategory;
};

export const getSubcateById = async (id: string) => {
  const result = await privateInstance.get(`/sub-category/${id}`);
  return result.data as ISubCategory;
};
