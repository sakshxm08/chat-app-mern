import User from "../models/user.model.js";

export const get_contacts = async (req, res) => {
  try {
    const logged_in_user_id = req.user._id;

    const contacts = await User.find({
      _id: { $ne: logged_in_user_id },
    }).select("-password");

    res.status(200).json(contacts);
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
