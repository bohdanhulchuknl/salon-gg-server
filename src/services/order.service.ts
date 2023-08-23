import { Request } from "express";
import User from "../models/User.model";
import Editor from "../models/Editor.model";
import Service from "../models/Service.model";

export const checkProvideBodyCreateOrder = (req: Request) => {
  const { fromUser, toEditor, services, totalPrice, totalTime, start, end } =
    req.body;

  if (!fromUser.trim()) throw new Error("fromUser don`t provide");
  if (!toEditor.trim()) throw new Error("toEditor don`t provide");
  if (!services.length) throw new Error("Services can`t be empty");
  if (!totalPrice) {
    throw new Error("totalPrice don`t provide");
  } else {
    if (totalPrice! > 0) throw new Error("totalPrice must be > 0");
  }
  if (!totalTime) {
    throw new Error("totalTime don`t provide");
  } else {
    if (totalTime! > 0) throw new Error("totalTime must be > 0");
  }

  if (!start || !start.length) throw new Error("Order start don`t provide");
  if (!end || !end.length) throw new Error("Order end don`t provide");
};

export const checkIsPropsExistInDB = async (
  fromUser: string,
  toEditor: string,
  services: string[]
) => {
  const user = await User.findById(fromUser);
  if (!user) throw new Error(`User with id ${fromUser} don't exist`);

  const editor = await Editor.findById(toEditor)
  if(!editor) throw new Error(`Editor with id ${toEditor} don't exist`)

  const servicesInDB = await Service.find({ '_id': { $in: services } });
  console.log(servicesInDB)
};
