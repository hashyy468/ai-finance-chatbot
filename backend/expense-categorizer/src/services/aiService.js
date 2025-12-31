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

const categorizeByAI = async (description) => {
  try {
    const prompt = `
Categorize the following expense into ONE category:
Food, Transport, Shopping, Utilities, Entertainment, Other.

Expense: "${description}"

Respond in JSON:
{ "category": "...", "confidence": 0.xx }
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
        temperature: 0.3,
        max_tokens: 50
      })
    });

    const data = await response.json();
    const parsed = JSON.parse(
      data.choices?.[0]?.message?.content || "{}"
    );

    return {
      category: VALID_CATEGORIES.includes(parsed.category)
        ? parsed.category
        : "Other",
      confidence: parsed.confidence || 0.65,
      method: "ai"
    };

  } catch (err) {
    return { category: "Other", confidence: 0.6, method: "ai" };
  }
};

module.exports = { categorizeByAI };
