"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var serviceSchema = new mongoose_1.Schema({
    title: {
        type: Object,
        ua: String,
        pl: String,
    },
    price: {
        type: Object,
        junior: Number,
        middle: Number,
        senior: Number,
    },
    time: Number,
    serviceGroup: { type: mongoose_1.Schema.Types.ObjectId, ref: "ServiceGroup" },
    editors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Editor",
        },
    ],
});
var Service = (0, mongoose_1.model)("Service", serviceSchema);
exports.default = Service;
