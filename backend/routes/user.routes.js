// Import necessary modules
import express from "express";
import { verify_token } from "../middlewares/verify_token.js";
import {
  get_contact_details,
  get_contacts,
} from "../controllers/user.controller.js";

// Create router instance
const router = express.Router();

// Define routes for user-related operations
router.get("/", verify_token, get_contacts); // Route to get user's contacts
router.get("/:contact_id", verify_token, get_contact_details); // Route to get details of a specific contact

// Export the router
export default router;
