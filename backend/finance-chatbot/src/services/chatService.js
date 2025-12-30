import fetch from "node-fetch";
import financeSystemPrompt from "../prompts/financePrompt.js";
import { getContext, saveContext } from "./memoryService.js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

export async function generateAIResponse(context, message) {
  const { sessionId } = context;

  try {
    const history = getContext(sessionId);

    const messages = [
      { role: "system", content: financeSystemPrompt },

      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content
      })),

      { role: "user", content: message }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.25,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("Empty response from model");
    }

    // ✅ SAVE CONTEXT FIRST (KEY FIX)
    saveContext(sessionId, "user", message);
    saveContext(sessionId, "assistant", rawContent);

    const firstBrace = rawContent.indexOf("{");
    const lastBrace = rawContent.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("Invalid JSON response");
    }

    return JSON.parse(rawContent.slice(firstBrace, lastBrace + 1));

  } catch (error) {
    console.error("Chat service error:", error.message);

    return {
      response: {
        summary:
          "I’m having trouble answering that right now. Please try again shortly."
      }
    };
  }
}
