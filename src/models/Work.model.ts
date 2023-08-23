import { Schema, model } from "mongoose";

const workSchema = new Schema({
  title: String,
  serviceGroup: String,
  variant: String,
  editor: String,
  img: String
});

const Work = model("Work", workSchema);

export default Work;
