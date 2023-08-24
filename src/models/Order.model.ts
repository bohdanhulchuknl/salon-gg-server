import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: "User" },
  toEditor: { type: Schema.Types.ObjectId, ref: "Editor" },
  services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
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

const Order = model("Order", orderSchema);

export default Order;
