"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: String,
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
        default: [],
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
});
var User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
