"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    fromUser: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    toEditor: { type: mongoose_1.Schema.Types.ObjectId, ref: "Editor" },
    services: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Service" }],
    totalPrice: Number,
    totalTime: Number,
    start: String,
    end: String,
    number: Number,
    status: {
        type: Object,
        title: String,
        text: String,
    },
});
var Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
