import { IUser } from './user.interface';

export interface IComment {
  _id: string;
  content: string;
  user: IUser;
  product: string;
}
