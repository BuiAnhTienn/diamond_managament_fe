import { publicInstance } from "@axios/axios";
import { IUser } from "@interfaces/user.interface";

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  const result = await publicInstance.post(`/auth/login`, payload);

  return result.data as { accessToken: string; user: IUser };
};

export const register = async (payload: {
  username: string;
  password: string;
  fullName: string;
  email: string;
}) => {
  const result = await publicInstance.post(`/auth/register`, payload);
  return result.data as { accessToken: string; user: IUser };
};

export const forgotPassword = async (payload: { username: string }) => {
  const result = await publicInstance.post(`/auth/forgot-password`, payload);

  return result.data;
};


//