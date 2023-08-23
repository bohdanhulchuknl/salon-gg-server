import { Router } from "express";
import {
  createService,
  createServiceGroup,
} from "../controllers/services.controller";

const serviceRouter = Router();

serviceRouter.post("/create", createService);

serviceRouter.post("/create-service-group", createServiceGroup);

export default serviceRouter;
