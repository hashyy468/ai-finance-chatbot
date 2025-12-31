const { categorizeByRule } = require("../services/ruleService");
const { categorizeByAI } = require("../services/aiService");

const categorizeExpense = async (req, res) => {
  const { description } = req.body;

  if (!description || typeof description !== "string") {
    return res.status(400).json({
      error: "Description must be a valid string"
    });
  }

  let category = categorizeByRule(description);
  let method = "rule";
  let confidence = 0.9; // default confidence for rule-based

  if (!category) {
    category = await categorizeByAI(description);
    method = "ai";
    confidence = 0.6; // lower confidence for AI fallback
  }

  res.json({
    description,
    category,
    method,
    confidence
  });
};

module.exports = { categorizeExpense };
