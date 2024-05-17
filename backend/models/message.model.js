import { Schema, model } from "mongoose";

const message_schema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model("message", message_schema);

export default Message;
