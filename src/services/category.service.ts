import { privateInstance } from "@axios/axios";
import { ICategory } from "@interfaces/category.interface";

const baseCategory = "/category";

export const getCategory = async () => {
  const result = await privateInstance.get(`${baseCategory}`);
  return result.data?.docs as ICategory[];
};

export const getCategoryById = async (id: string) => {
  const result = await privateInstance.get(`${baseCategory}/${id}`);
  return result.data as ICategory;
};

export const createCategory = async ({ name }: { name: string }) => {
  const result = await privateInstance.post(`${baseCategory}/`, { name });
  return result.data as ICategory;
};

export const editCategory = async ({
  name,
  id,
}: {
  name: string;
  id: string;
}) => {
  const result = await privateInstance.put(`${baseCategory}/${id}`, { name });
  return result.data as ICategory;
};

export const deleteCategory = async ({ id }: { id: string }) => {
  const result = await privateInstance.delete(`${baseCategory}/${id}`);
  return result.data as ICategory;
};

//sub-category/group-category

export const getCategoryWithSubCate = async () => {
  const result = await privateInstance.get(`/sub-category/group-category`);
  return result.data;
};
