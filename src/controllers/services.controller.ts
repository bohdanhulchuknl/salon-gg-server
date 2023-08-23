import { Request, Response } from "express";
import {
  checkIsGroupExist,
  checkIsProvideBodyCreateService,
  checkIsProvideBodyCreateServiceGroup,
  checkIsServiceExist,
  storeNewServiceGroupInDB,
  storeNewServiceInDb,
} from "../services/service.service";


export const createService = async (req: Request, res: Response) => {
  try {
    checkIsProvideBodyCreateService(req);
    const { title, price, time, serviceGroup, editors } = req.body;
    await checkIsServiceExist({ title });
    const newService = await storeNewServiceInDb({
      price,
      serviceGroup,
      time,
      title,
      editors
    });
    return res.status(200).json(newService);
  } catch (err:any) {
    return res.status(500).json(err.message);
  }
};


export const createServiceGroup = async (req: Request, res: Response) => {
  try {
    checkIsProvideBodyCreateServiceGroup(req);
    const { title, variants } = req.body;
    await checkIsGroupExist(title);
    const newServiceGroup = await storeNewServiceGroupInDB(title, variants);
    return res.status(200).json(newServiceGroup);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};

