// Import necessary modules
import express from "express";
import {
  get_messages,
  get_unread_messages,
  send_message,
} from "../controllers/message.controller.js";
import { verify_token } from "../middlewares/verify_token.js";

// Create router instance
const router = express.Router();

// Define routes for message handling
router.get("/unread_messages", verify_token, get_unread_messages); // Route to send a message to a specific receiver
router.get("/:receiver_id", verify_token, get_messages); // Route to get messages for a specific receiver
router.post("/send/:receiver_id", verify_token, send_message); // Route to send a message to a specific receiver

// Export the router
export default router;
