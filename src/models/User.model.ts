import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: [true, "Username is required"] },
  googleId: {
    type: String,
    default: "",
  },
  picture: String,
  locale: {
    type: String,
    default: "ru",
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  roles: {
    type: Array,
    default: [2001]
  }
});

const User = model("User", userSchema);

export default User;
