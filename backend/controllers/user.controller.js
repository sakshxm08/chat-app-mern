// Import necessary models
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// Controller to get all contacts for the logged-in user along with the latest message exchanged
export const get_contacts = async (req, res) => {
  try {
    const logged_in_user_id = req.user._id;

    // Find all users excluding the logged-in user
    const contacts = await User.find({
      _id: { $ne: logged_in_user_id },
    }).select("-password");

    // Find all conversations that include the logged-in user
    const conversations = await Conversation.find({
      participants: logged_in_user_id,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, perDocumentLimit: 1 },
    });

    // Find all unread messages for the logged-in user
    const unread_messages = await Message.find({
      is_read: false,
      receiver_id: logged_in_user_id,
    });

    // Group the unread messages by sender ID
    const unread_messages_of_user = unread_messages.reduce((acc, message) => {
      acc[message.sender_id] = acc[message.sender_id] || [];
      acc[message.sender_id].push(message);
      return acc;
    }, {});

    // Create a map to store the latest message for each contact
    const latestMessagesMap = new Map();

    conversations.forEach((conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant_id) =>
          participant_id.toString() !== logged_in_user_id.toString()
      );

      if (conversation.messages.length > 0) {
        latestMessagesMap.set(
          otherParticipant.toString(),
          conversation.messages[0]
        );
      }
    });

    // Map over each contact and add the latest message and unread messages to the contact object
    const contactsWithDetails = contacts.map((contact) => {
      const contactObj = contact.toObject();
      contactObj.latest_message =
        latestMessagesMap.get(contact._id.toString()) || null;
      contactObj.unread_messages =
        unread_messages_of_user[contact._id.toString()] || [];
      return contactObj;
    });

    res.status(200).json(contactsWithDetails);
  } catch (error) {
    console.log("Error in Get Contacts Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

// Controller to get the details of a specific contact by their ID
export const get_contact_details = async (req, res) => {
  try {
    // Get the contact ID from the request parameters
    const { contact_id } = req.params;

    // Find the user by ID and exclude the password field from the result
    const contact = await User.findById(contact_id).select("-password");

    // If the contact is not found, return a 404 status with a message
    if (!contact) return res.status(404).json({ message: "User not found" });

    // If the contact is found, return the contact details as a JSON response
    return res.status(200).json(contact);
  } catch (error) {
    // Log any errors and return an internal server error response
    console.log("Error in Get Individual Contact Controller: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};
