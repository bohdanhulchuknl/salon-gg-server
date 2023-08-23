import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
    default: [{value: '', verified: false}],
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
    type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    default: [],
  },
});

const User = model("User", userSchema);

export default User;
