import { IUser } from "../types/user.types";

export const getClearDbUser = (dbUser:any) => {
  const { __v, _id, ...rest } = dbUser;
  const clearUser: IUser = rest;
  return clearUser;
};
