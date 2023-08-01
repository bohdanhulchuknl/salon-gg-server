import { ObjectId } from "mongoose";

export interface IUser {
  name: string;
  googleId: string;
  picture: string;
  locale: string;
  emails: { value: string; verified: boolean }[];
  phone: { value: string; verified: boolean };
}

export interface IUserDB extends IUser {
  _id: ObjectId;
  __v: number;
}
