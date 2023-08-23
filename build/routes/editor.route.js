"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var editors_controller_1 = require("../controllers/editors.controller");
var editorRouter = (0, express_1.Router)();
editorRouter.post("/create", editors_controller_1.createEditor);
exports.default = editorRouter;
