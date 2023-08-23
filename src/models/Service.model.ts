import { Schema, model } from "mongoose";

const serviceSchema = new Schema({
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
  serviceGroup: { type: Schema.Types.ObjectId, ref: "ServiceGroup" },
  editors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Editor",
    },
  ],
});

const Service = model("Service", serviceSchema);

export default Service;
