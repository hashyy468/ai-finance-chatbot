const fetch = require("node-fetch");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

const VALID_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Other"
];

async function categorizeByAI(description) {
  try {
    const prompt = `
Categorize the expense into ONE category:
Food, Transport, Shopping, Utilities, Entertainment, Other.

Return ONLY valid JSON:
{ "category": "Food", "confidence": 0.0 }

Expense: "${description}"
`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 40
      })
    });

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw);

    return {
      category: VALID_CATEGORIES.includes(parsed.category)
        ? parsed.category
        : "Other",
      confidence:
        typeof parsed.confidence === "number"
          ? Math.min(Math.max(parsed.confidence, 0.6), 0.95)
          : 0.7,
      method: "ai"
    };
  } catch {
    return {
      category: "Other",
      confidence: 0.6,
      method: "ai"
    };
  }
}

module.exports = { categorizeByAI };
