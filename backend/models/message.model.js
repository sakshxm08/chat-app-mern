// Import necessary modules
import { Schema, model } from "mongoose";

// Define message schema
const message_schema = new Schema(
  {
    // Sender ID referencing the User model, required field
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // Receiver ID referencing the User model, required field
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // Message content, required field
    message: {
      type: String,
      required: true,
    },
    is_read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // Enable timestamps to automatically track createdAt and updatedAt fields
  { timestamps: true }
);

// Create Message model using the defined schema
const Message = model("message", message_schema);

// Export Message model
export default Message;
