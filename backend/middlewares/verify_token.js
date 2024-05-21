import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const verify_token = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ message: "Unauthorized - Token Not Verified" });

    const user = await User.findById(decoded.user_id).select("-password");

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    req.user = user;

    next();
  } catch (error) {
    // Log and return internal server error response
    console.log("Error in Verify Token Middleware: " + error.message);
    return res.status(501).json({ message: "Internal Server Error" });
  }
};
