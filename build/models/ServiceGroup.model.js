"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var serviceGroupSchema = new mongoose_1.Schema({
    title: {
        type: Object,
        ua: String,
        pl: String,
    },
    variants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Service" }],
});
var ServiceGroup = (0, mongoose_1.model)("ServiceGroup", serviceGroupSchema);
exports.default = ServiceGroup;
