import { Schema, model } from "mongoose";

const user_schema = new Schema(
  {
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    profile_pic: { type: String, default: "" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = model("user", user_schema);

export default User;
