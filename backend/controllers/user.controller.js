// Import necessary models
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

// Controller to get all contacts for the logged-in user along with the latest message exchanged
export const get_contacts = async (req, res) => {
  try {
    // Get the logged-in user's ID from the request object
    const logged_in_user_id = req.user._id;

    // Find all users excluding the logged-in user, and exclude the password field from the result
    const contacts = await User.find({
      _id: { $ne: logged_in_user_id },
    }).select("-password");

    // Find all conversations that include the logged-in user, populate the messages field,
    // and sort messages by creation date in descending order, limiting to the latest message
    const conversations = await Conversation.find({
      participants: logged_in_user_id,
    }).populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, perDocumentLimit: 1 },
    });

    // Create a map to store the latest message for each contact
    const latest_messages_map = new Map();

    // Iterate over each conversation to extract the latest message
    conversations.forEach((conversation) => {
      // Find the other participant in the conversation
      const other_participant = conversation.participants.find(
        (participant_id) =>
          participant_id.toString() !== logged_in_user_id.toString()
      );

      // If the conversation has messages, set the latest message in the map
      if (conversation.messages.length > 0) {
        latest_messages_map.set(
          other_participant.toString(),
          conversation.messages[0]
        );
      }
    });

    // Map over each contact and add the latest message to the contact object
    const contacts_with_latest_message = contacts.map((contact) => {
      const contact_obj = contact.toObject();
      contact_obj.latest_message =
        latest_messages_map.get(contact._id.toString()) || null;
      return contact_obj;
    });

    // Send the modified contacts list as a JSON response
    res.status(200).json(contacts_with_latest_message);
  } catch (error) {
    // Log any errors and return an internal server error response
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
