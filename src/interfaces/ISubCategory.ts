import { ICategory } from './category.interface';

export interface ISubCategory {
  name: string;
  _id?: string;
  category: ICategory;
}
