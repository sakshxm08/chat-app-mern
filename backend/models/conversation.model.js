import { Schema, model } from "mongoose";

const conversation_schema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "message", default: [] }],
  },
  { timestamps: true }
);

const Conversation = model("conversation", conversation_schema);

export default Conversation;
