import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const get_contacts = async (req, res) => {
  try {
    const logged_in_user_id = req.user._id;

    const contacts = await User.find({
      _id: { $ne: logged_in_user_id },
    }).select("-password");

    const conversations = await Conversation.find({
      participants: logged_in_user_id,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

    const latest_messages_map = new Map();

    conversations.forEach((conversation) => {
      const other_participant = conversation.participants.find(
        (participant_id) =>
          participant_id.toString() !== logged_in_user_id.toString()
      );
      if (conversation.messages.length > 0) {
        latest_messages_map.set(
          other_participant.toString(),
          conversation.messages[0]
        );
      }
    });

    const contacts_with_latest_message = contacts.map((contact) => {
      const contact_obj = contact.toObject();
      contact_obj.latest_message =
        latest_messages_map.get(contact._id.toString()) || null;
      return contact_obj;
    });

    res.status(200).json(contacts_with_latest_message);
  } catch (error) {
    // Log and return internal server error response
    console.log("Error in Get Contacts Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

export const get_contact_details = async (req, res) => {
  try {
    const { contact_id } = req.params;
    const contact = await User.findById(contact_id).select("-password");
    if (!contact) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(contact);
  } catch (error) {
    // Log and return internal server error response
    console.log("Error in Get Individual Contact Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};
