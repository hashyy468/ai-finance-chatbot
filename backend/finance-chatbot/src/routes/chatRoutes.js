import express from "express";
import { handleChat } from "../controllers/chatController.js";
import { resetSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", handleChat);
router.post("/reset", resetSession);

export default router;
