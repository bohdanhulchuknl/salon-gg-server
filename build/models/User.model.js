"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        default: "",
    },
    picture: {
        type: String,
        default: "",
    },
    locale: {
        type: String,
        default: "ru",
    },
    emails: {
        type: [
            {
                value: {
                    type: String,
                    default: ''
                },
                verified: {
                    type: Boolean,
                    default: false
                },
            },
        ],
        default: [{ value: '', verified: false }],
    },
    phone: {
        type: Object,
        value: {
            type: String,
            default: ''
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    roles: {
        type: Array,
        default: [2001],
    },
    orders: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Order" }],
        default: [],
    },
});
var User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
