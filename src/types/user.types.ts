import { Types } from "mongoose";

export interface IUser {
  name: string;
  googleId: string;
  picture: string;
  locale: string;
  emails: { value: string; verified: boolean }[];
  phone?: { value: string; verified: boolean };
  roles: number[];
  orders?: Types.ObjectId[];
}

export interface IService {
  title: {
    ua: string;
    pl: string;
  };
  price: {
    junior: number;
    middle: number;
    senior: number;
  };
  time: number;
}

export interface IWork {
  title: string;
  serviceGroup: string;
  variant: string;
  editor: string;
  img: string;
}

export interface IComment {
  from: IUser;
  to: IEditor;
  title: string;
  text: string;
}

export interface IOrder {
  fromUser: IUser;
  toEditor: IEditor;
  services: IService[];
  totalPrice: number;
  totalTime: number;
  start: string;
  end: string;
  number: number;
  status: string;
}

export interface IEditor extends IUser {
  rang: string;
}

export interface IServiceGroup {
  title: {
    ua: string;
    pl: string;
  };
  variants: IService[];
}
