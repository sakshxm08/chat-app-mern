// Import necessary modules
import { Schema, model } from "mongoose";

// Define conversation schema
const conversation_schema = new Schema(
  {
    // Array of participants (user IDs) involved in the conversation
    participants: [{ type: Schema.Types.ObjectId, ref: "user" }],
    // Array of messages (message IDs) in the conversation, initialized as an empty array
    messages: [{ type: Schema.Types.ObjectId, ref: "message", default: [] }],
  },
  // Enable timestamps to automatically track createdAt and updatedAt fields
  { timestamps: true }
);

// Create Conversation model using the defined schema
const Conversation = model("conversation", conversation_schema);

// Export Conversation model
export default Conversation;
