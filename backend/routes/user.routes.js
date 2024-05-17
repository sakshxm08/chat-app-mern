import express from "express";
import { verify_token } from "../middlewares/verify_token.js";
import {
  get_contact_details,
  get_contacts,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verify_token, get_contacts);
router.get("/:contact_id", verify_token, get_contact_details);

export default router;
