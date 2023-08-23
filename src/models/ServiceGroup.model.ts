import { Schema, model } from "mongoose";

const serviceGroupSchema = new Schema({
  title: {
    type: Object,
    ua: String,
    pl: String,
  },
  variants: [{ type: Schema.Types.ObjectId, ref: "Service" }],
});

const ServiceGroup = model("ServiceGroup", serviceGroupSchema);

export default ServiceGroup;
