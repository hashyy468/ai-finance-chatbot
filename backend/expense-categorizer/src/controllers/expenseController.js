const { categorizeByRule } = require("../services/ruleService");
const { categorizeByAI } = require("../services/aiService");

const categorizeExpense = async (req, res) => {
  const { description } = req.body;

  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Invalid description" });
  }

  const ruleResult = categorizeByRule(description);

  if (ruleResult) {
    return res.json({
      description,
      category: ruleResult.category,
      confidence: ruleResult.confidence, // 0–1
      method: "rule"
    });
  }

  const aiResult = await categorizeByAI(description);
  return res.json({
    description,
    category: aiResult.category,
    confidence: aiResult.confidence, // 0–1
    method: "ai"
  });
};

// 🔹 Explicit AI-only endpoint
const categorizeExpenseAI = async (req, res) => {
  const { description } = req.body;
  const aiResult = await categorizeByAI(description);
  res.json(aiResult);
};

module.exports = { categorizeExpense, categorizeExpenseAI };
