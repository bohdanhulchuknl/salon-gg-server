import { Schema, model } from "mongoose";

import { EDITOR_RANG } from "../config/constants";

const editorSchema = new Schema({
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
    type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    default: [],
  },
  rang: {
    type: String,
    default: EDITOR_RANG.junior,
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
  works: {
    type: [{ type: Schema.Types.ObjectId, ref: "Work" }],
    default: [],
  },
  services: {
    type: [{ type: Schema.Types.ObjectId, ref: "Service"}],
    default: [],
  },
});

const Editor = model("Editor", editorSchema);

export default Editor;
