import { Request, Response } from "express";
import {
  checkIsPropsExistInDB,
  checkProvideBodyCreateOrder,
  storeOrderInDB,
} from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    checkProvideBodyCreateOrder(req);
    const { fromUser, toEditor, services, totalPrice, totalTime, start, end } =
      req.body;
    await checkIsPropsExistInDB(fromUser, toEditor, services);
    //!check editor has window
    const newOrder = await storeOrderInDB(
      fromUser,
      toEditor,
      services,
      totalPrice,
      totalTime,
      start,
      end
    );
    res.status(200).json(newOrder);
  } catch (err: any) {
    res.status(err.status ?? 500).json(err.message ?? "Some server Error");
  }
};
