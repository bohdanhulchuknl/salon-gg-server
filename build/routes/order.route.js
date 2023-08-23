"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orders_controller_1 = require("../controllers/orders.controller");
var orderRouter = (0, express_1.Router)();
orderRouter.post('/create', orders_controller_1.createOrder);
exports.default = orderRouter;
