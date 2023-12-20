import { privateInstance } from '@axios/axios';
import { type IUser } from '@interfaces/user.interface';

const userURL = `/users`;

export const me = async () => {
  const res = await privateInstance.get(`${userURL}/me`);
  return res.data as IUser;
};

export const updateInfo = async ({
  fullName,
  email,
  password,
}: {
  fullName?: string;
  email?: string;
  password?: string;
}) => {
  const res = await privateInstance.put(`${userURL}/me`, {
    fullName,
    email,
    password,
  });
  return res.data as IUser;
};

export const getUserList = async () => {
  const res = await privateInstance.get(`${userURL}`);
  return res.data as IUser[];
};
