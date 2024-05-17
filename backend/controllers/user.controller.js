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
