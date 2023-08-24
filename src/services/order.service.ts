import { Request } from "express";
import User from "../models/User.model";
import Editor from "../models/Editor.model";
import Service from "../models/Service.model";
import Order from "../models/Order.model";
import { ORDER_STATUSES } from "../config/constants";

export const checkProvideBodyCreateOrder = (req: Request) => {
  const { fromUser, toEditor, services, totalPrice, totalTime, start, end } =
    req.body;

  if (!fromUser.trim()) throw new Error("fromUser don`t provide");
  if (!toEditor.trim()) throw new Error("toEditor don`t provide");
  if (!services.length) throw new Error("Services can`t be empty");
  if (!totalPrice) {
    throw new Error("totalPrice don`t provide");
  } else {
    if (totalPrice <= 0) throw new Error("totalPrice must be > 0");
  }
  if (!totalTime) {
    throw new Error("totalTime don`t provide");
  } else {
    if (totalTime <= 0) throw new Error("totalTime must be > 0");
  }

  if (!start || !start.length) throw new Error("Order start don`t provide");
  if (!end || !end.length) throw new Error("Order end don`t provide");
};

export const checkIsPropsExistInDB = async (
  fromUser: string,
  toEditor: string,
  services: string[]
) => {
  try {
    const user = await User.findById(fromUser);
    if (!user) throw new Error(`User with id ${fromUser} don't exist`);

    const editor = await Editor.findById(toEditor);
    if (!editor) throw new Error(`Editor with id ${toEditor} don't exist`);
    try {
      await Service.find({ _id: { $in: services } });
    } catch (err: any) {
      throw new Error(`Service with id ${err.value} don't exist`);
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const storeOrderInDB = async (
  fromUser: string,
  toEditor: string,
  services: string[],
  totalPrice: number,
  totalTime: number,
  start: string,
  end: string
) => {
  try {
    const newOrder = new Order({
      fromUser,
      toEditor,
      services,
      totalPrice,
      totalTime,
      start,
      end,
      status: {
        title: ORDER_STATUSES.pending.title,
        text: ORDER_STATUSES.pending.text.admin,
      },
    });
    await newOrder.save();

    const user = await User.findById(fromUser);
    user?.orders.push(newOrder._id);
    await user?.save();

    const editor = await Editor.findById(toEditor);
    editor?.orders.push(newOrder._id);
    await editor?.save();
    return newOrder;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
