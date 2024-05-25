import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { get_receiver_socket_id, io } from "../socket/socket.js";

// Controller for sending a message
export const send_message = async (req, res) => {
  try {
    const { message } = req.body; // Extract message content from request body
    const { receiver_id } = req.params; // Extract receiver ID from request parameters
    const sender_id = req.user._id; // Extract sender ID from authenticated user

    // Check if a conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [sender_id, receiver_id] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        participants: [sender_id, receiver_id],
      });
    }

    // Create a new message document
    const new_message = new Message({
      sender_id,
      receiver_id,
      message,
    });

    // If the message is created, push it to the conversation's messages array
    if (new_message) {
      conversation.messages.push(new_message._id);
    }

    // Save both the conversation and the new message
    await Promise.all([conversation.save(), new_message.save()]);

    // Get the receiver's socket ID and emit the new message via WebSocket if they are connected
    const receiver_socket_id = get_receiver_socket_id(receiver_id);
    if (receiver_socket_id) {
      io.to(receiver_socket_id).emit("new_message", new_message);
    }

    // Respond with the created message
    res.status(201).json(new_message);
  } catch (error) {
    // Log error and respond with internal server error
    console.log("Error in Send Message Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

// Controller for retrieving messages between the sender and receiver
export const get_messages = async (req, res) => {
  try {
    const { receiver_id } = req.params; // Extract receiver ID from request parameters
    const sender_id = req.user._id; // Extract sender ID from authenticated user

    // Find the conversation between the sender and receiver and populate the messages
    const conversation = await Conversation.findOne({
      participants: { $all: [sender_id, receiver_id] },
    }).populate("messages"); // Automatically retrieve messages from their stored IDs

    // If no conversation is found, return an empty array
    if (!conversation) return res.status(200).json([]);

    // Respond with the messages array
    const messages = conversation.messages;
    return res.status(200).json(messages);
  } catch (error) {
    // Log error and respond with internal server error
    console.log("Error in Get Message Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

export const get_unread_messages = async (req, res) => {
  try {
    // Fetch all unread messages for the logged-in user
    const unread_messages = await Message.find({
      is_read: false,
      receiver_id: req.user._id,
    });

    // Group the unread messages by receiver ID
    const unread_messages_of_user = unread_messages.reduce((acc, message) => {
      acc[message.sender_id] = acc[message.sender_id] || [];
      acc[message.sender_id].push(message);
      return acc;
    }, {});
    return res.status(200).json(unread_messages_of_user);
  } catch (error) {
    // Log error and respond with internal server error
    console.log("Error in Get Unread Messages Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

export const update_message_to_read = async ({ message_id }) => {
  try {
    // Update message status in the database to mark it as read
    await Message.findByIdAndUpdate(message_id, { is_read: true });
    // Emit an event to notify other clients about the updated message
  } catch (error) {
    console.error("Error marking message as read:", error);
  }
};
