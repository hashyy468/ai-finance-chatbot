import { generateAIResponse } from "../services/chatService.js";
import { getDefinition } from "../services/ruleBased.js";
import { detectIntent } from "../services/intentService.js";

function getFollowUps(intent) {
  switch (intent) {
    case "BUDGETING":
      return [
        "Share your monthly income",
        "View a 50/30/20 breakdown",
        "Add fixed expenses"
      ];

    case "FINANCE_GENERAL":
      return [
        "Confirm income frequency",
        "Set a savings goal",
        "Add existing debts"
      ];

    case "INVESTING":
      return [
        "Define your risk level",
        "Choose time horizon",
        "Compare SIP vs lump sum"
      ];

    case "DEBT":
      return [
        "Add interest rate",
        "Check loan tenure",
        "See payoff strategy"
      ];

    case "FOLLOW_UP":
      return [
        "See a practical example",
        "Customize this plan",
        "Get next steps"
      ];

    default:
      return [];
  }
}

export async function handleChat(req, res) {
  const { message, sessionId } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      response: { summary: "Message is required" }
    });
  }

  const { intent } = detectIntent(message);

  if (intent === "GREETING") {
    return res.json({
      response: {
        summary:
          "Hi! I can help with budgeting, savings, EMIs, debt management, and basic investing.",
        followUps: []
      }
    });
  }

  const definitionResponse = getDefinition(message, intent);
  if (definitionResponse) {
    return res.json({
      ...definitionResponse,
      followUps: []
    });
  }

  if (intent === "OUT_OF_SCOPE") {
    return res.json({
      response: {
        summary:
          "I can help with budgeting, savings, EMIs, debt management, and investing basics.",
        followUps: []
      }
    });
  }

  const result = await generateAIResponse({ sessionId, intent }, message);

  return res.json({
    response: {
      ...result.response,
      followUps: getFollowUps(intent)
    }
  });
}
