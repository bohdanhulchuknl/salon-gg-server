import { IUser, IUserDB } from "../types/user.types";

export const getClearDbUser = (dbUser: IUserDB) => {
  const { __v, _id, ...rest } = dbUser;
  const clearUser: IUser = rest;
  return clearUser;
};
