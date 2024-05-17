import express from "express";
import {
  get_messages,
  send_message,
} from "../controllers/message.controller.js";
import { verify_token } from "../middlewares/verify_token.js";

const router = express.Router();

router.get("/:receiver_id", verify_token, get_messages);
router.post("/send/:receiver_id", verify_token, send_message);

export default router;
