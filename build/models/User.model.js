"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: [true, "Username is required"] },
    googleId: {
        type: String,
        default: "",
    },
    picture: String,
    locale: {
        type: String,
        default: "ru",
    },
    email: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    roles: {
        type: Array,
        default: [2001]
    }
});
var User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
