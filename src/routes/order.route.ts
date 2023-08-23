import { Router } from "express";
import { createOrder } from "../controllers/orders.controller";

const orderRouter = Router();

orderRouter.post('/create', createOrder)

export default orderRouter;
