import { Role } from '@constants/Role';

export interface IUser {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  role: Role;
}
