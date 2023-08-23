"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: "Editor" },
    title: String,
    text: String,
});
var Comment = (0, mongoose_1.model)("Model", commentSchema);
exports.default = Comment;
