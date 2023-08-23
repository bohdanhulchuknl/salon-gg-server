"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var workSchema = new mongoose_1.Schema({
    title: String,
    serviceGroup: String,
    variant: String,
    editor: String,
    img: String
});
var Work = (0, mongoose_1.model)("Work", workSchema);
exports.default = Work;
