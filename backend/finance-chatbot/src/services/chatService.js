import fetch from "node-fetch";
import { buildPrompt } from "../prompts/financePrompt.js";
import { detectIntent } from "./intentService.js";
import { ruleBasedFinanceFallback } from "./fallbackService.js";
import { isSimpleQuestion } from "./complexityService.js";

/**
 * Safely normalize LLM output
 * Handles:
 * - "\"text\"" (double-encoded JSON)
 * - escaped quotes
 * - leaked prompt text
 */
function cleanLLMResponse(raw) {
  if (!raw) return "";

  let text = raw;

  // Step 1: force string
  text = String(text);

  // Step 2: remove wrapping quotes (handles "\"text\"" and ""text"")
  while (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1);
  }

  // Step 3: unescape escaped quotes & slashes
  text = text
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");

  // Step 4: normalize newlines
  text = text.replace(/\\n/g, " ");

  // Step 5: remove prompt leakage (VERY IMPORTANT)
  text = text.replace(/User question:.*/is, "");

  // Step 6: trim trailing punctuation artifacts
  text = text.replace(/\s*[,]+$/, "");

  // Step 7: final cleanup
  return text.replace(/\s+/g, " ").trim();
}


/**
 * Main chatbot response handler
 * - Simple queries → rule-based
 * - Complex queries → Ollama (phi)
 */
export async function generateAIResponse(context, message) {
  const intent = detectIntent(message);
  const simple = isSimpleQuestion(message);

  /**
   * 🚀 SIMPLE QUESTION → RULE-BASED ONLY
   */
  if (simple) {
    const fallback = ruleBasedFinanceFallback(message);

    return {
      intent,
      response: {
        summary: fallback.summary,
        disclaimer:
          "This information is for educational purposes only and not financial advice."
      },
      followUps: fallback.followUps
    };
  }

  /**
   * 🧠 COMPLEX QUESTION → TRY OLLAMA
   */
  const prompt = buildPrompt({ intent }, message);

  const controller = new AbortController();
  const TIMEOUT_MS = 40000; // 40s for local LLM

  const timeout = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MS);

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi",        // lightweight, fast model
        prompt,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Ollama request failed");
    }

    const data = await response.json();

    return {
      intent,
      response: {
        summary: cleanLLMResponse(data.response),
        disclaimer:
          "This information is for educational purposes only and not financial advice."
      },
      followUps: ruleBasedFinanceFallback(message).followUps
    };

  } catch (error) {
    /**
     * 🛟 FINAL SAFETY NET
     * Ensures chatbot always responds
     */
    console.warn("LLM failed or timed out. Using rule-based fallback.");

    const fallback = ruleBasedFinanceFallback(message);

    return {
      intent,
      response: {
        summary: fallback.summary,
        disclaimer:
          "This information is for educational purposes only and not financial advice."
      },
      followUps: fallback.followUps
    };
  }
}
