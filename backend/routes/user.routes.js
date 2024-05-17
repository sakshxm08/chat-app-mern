import express from "express";
import { verify_token } from "../middlewares/verify_token.js";
import { get_contacts } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verify_token, get_contacts);

export default router;
