"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var services_controller_1 = require("../controllers/services.controller");
var serviceRouter = (0, express_1.Router)();
serviceRouter.post("/create", services_controller_1.createService);
serviceRouter.post("/create-service-group", services_controller_1.createServiceGroup);
exports.default = serviceRouter;
