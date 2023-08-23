import { Request } from "express";
import User from "../models/User.model";
import Service from "../models/Service.model";
import { IComment, IService, IUser, IWork } from "../types/user.types";
import Editor from "../models/Editor.model";
import { ROLES_LIST } from "../config/constants";

export const checkIsProvideBodyCreateEditor = (req: Request) => {
  const { userId, services } = req.body;
  if (!userId) throw new Error("userId don`t provide");
  if (!services.length) throw new Error("Services Arr can`t be empty");
};

export const checkIsUserExist = async (userId: string) => {
  const userFromDB = await User.findById(userId);
  if (!userFromDB) throw new Error(`User with id ${userId} don't found`);

  return userFromDB;
};

export const checkIsServicesExist = async (services: string[]) => {
  try {
    await Service.find({ _id: { $in: services } });
  } catch (err: any) {
    throw new Error(`Service with id ${err.value} don't exist`);
  }
};

export const storeEditorInDB = async (
  userFromDB: IUser,
  services: string[],
  rang: string,
  comments: string[],
  works: string[]
) => {
  try {
    const { roles, name, googleId, picture, locale, emails, phone } =
      userFromDB;
    const newEditor = new Editor({
      name,
      googleId,
      picture,
      locale,
      emails,
      phone,
      roles: [...roles, ROLES_LIST.Editor],
      orders: [],
      services,
      rang,
      comments: comments.length ? comments : [],
      works: works.length ? works : [],
    });
    return await newEditor.save();
  } catch (err: any) {
    throw new Error(err.message ?? "Some problem with store Editor is DB");
  }
};
