import { generateAIResponse } from "../services/chatService.js";

export async function handleChat(req, res) {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await generateAIResponse({ sessionId }, message);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "AI service failed",
      details: err.message
    });
  }
}
