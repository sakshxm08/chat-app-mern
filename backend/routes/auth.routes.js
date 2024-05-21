import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { verify_token } from "../middlewares/verify_token.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

export default router;
