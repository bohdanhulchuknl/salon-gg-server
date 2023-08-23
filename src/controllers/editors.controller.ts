import { Request, Response } from "express";
import {
  checkIsProvideBodyCreateEditor,
  checkIsServicesExist,
  checkIsUserExist,
  storeEditorInDB,
} from "../services/editor.service";

import { EDITOR_RANG } from "../config/constants";

export const createEditor = async (req: Request, res: Response) => {
  try {
    checkIsProvideBodyCreateEditor(req);
    const { userId, services, rang, comments, works } = req.body;
    const userFromDB = await checkIsUserExist(userId);
    await checkIsServicesExist(services);
    if (rang.trim()) {
      if (!Object.values(EDITOR_RANG).includes(rang))
        throw new Error(`Editor rank ${rang} isn't correct`);
    }
    const newEditor = await storeEditorInDB(userFromDB, services, rang, comments, works)
    res.status(200).json(newEditor);
  } catch (err: any) {
    res.status(err.status ?? 500).json(err.message ?? "Some went wrong");
  }
};
