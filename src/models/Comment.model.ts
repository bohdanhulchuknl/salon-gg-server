import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "Editor" },
  title: String,
  text: String,
});

const Comment = model("Model", commentSchema);

export default Comment;
