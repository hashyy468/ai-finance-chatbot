import { generateAIResponse } from "../services/chatService.js";
import { getDefinition } from "../services/ruleBased.js";
import { detectIntent } from "../services/intentService.js";

export async function handleChat(req, res) {
  const { message, sessionId } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      response: { summary: "Message is required" }
    });
  }

  const text = message.toLowerCase().trim();
  const { intent } = detectIntent(text);

  if (intent === "GREETING") {
    return res.json({
      response: {
        summary:
          "Hi! I can help with budgeting, savings, EMIs, debt management, and basic investing. What would you like to work on?"
      }
    });
  }

  const definitionResponse = getDefinition(message, intent);
  if (definitionResponse) {
    return res.json(definitionResponse);
  }

  if (intent === "OUT_OF_SCOPE") {
    return res.json({
      response: {
        summary:
          "I focus on personal finance topics like budgeting, savings, EMIs, credit, and basic investing."
      }
    });
  }

  try {
    const result = await generateAIResponse({ sessionId, intent }, message);
    return res.json(result);
  } catch {
    return res.status(500).json({
      response: {
        summary:
          "I’m having trouble answering that right now. Please try again shortly."
      }
    });
  }
}
