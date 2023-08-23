"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var constants_1 = require("../config/constants");
var editorSchema = new mongoose_1.Schema({
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
                    default: "",
                },
                verified: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        default: [{ value: "", verified: false }],
    },
    phone: {
        type: Object,
        value: {
            type: String,
            default: "",
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    roles: {
        type: Array,
        default: [2001, 5150],
    },
    orders: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Order" }],
        default: [],
    },
    rang: {
        type: String,
        default: constants_1.EDITOR_RANG.junior,
    },
    comments: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
        default: [],
    },
    works: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Work" }],
        default: [],
    },
    services: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Service" }],
        default: [],
    },
});
var Editor = (0, mongoose_1.model)("Editor", editorSchema);
exports.default = Editor;
