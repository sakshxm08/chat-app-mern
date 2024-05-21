import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { get_receiver_socket_id, io } from "../socket/socket.js";

export const send_message = async (req, res) => {
  try {
    const { message } = req.body;
    const { receiver_id } = req.params;
    const sender_id = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender_id, receiver_id] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [sender_id, receiver_id],
      });
    }

    const new_message = new Message({
      sender_id,
      receiver_id,
      message,
    });

    if (new_message) {
      conversation.messages.push(new_message._id);
    }

    await Promise.all([conversation.save(), new_message.save()]);

    const receiver_socket_id = get_receiver_socket_id(receiver_id);

    if (receiver_socket_id)
      io.to(receiver_socket_id).emit("new_message", new_message);

    res.status(201).json(new_message);
  } catch (error) {
    // Log and return internal server error response
    console.log("Error in Send Message Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

export const get_messages = async (req, res) => {
  try {
    const { receiver_id } = req.params;
    const sender_id = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender_id, receiver_id] },
    }).populate("messages"); // not reference, but actual messages (MongoDB automatically retreives messages from their stored IDs)

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    return res.status(200).json(messages);
  } catch (error) {
    // Log and return internal server error response
    console.log("Error in Get Message Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};
