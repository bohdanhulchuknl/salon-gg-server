import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
});

const User = model("User", userSchema);

export default User;
