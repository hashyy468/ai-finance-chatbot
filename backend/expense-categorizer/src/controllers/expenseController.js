const { categorizeByRule } = require('../services/ruleService');
const { categorizeByAI } = require('../services/aiService');

const categorizeExpense = async (req, res) => {
  const { description } = req.body;

  // Validate input
  if (!description || typeof description !== 'string') {
    return res.status(400).json({
      error: 'Description must be a valid string'
    });
  }

  // Try rule-based categorization first
  let category = categorizeByRule(description);
  let method = 'rule';

  // Fallback to AI
  if (!category) {
    category = await categorizeByAI(description);
    method = 'ai';
  }

  return res.json({
    description,
    category,
    method
  });
};

module.exports = { categorizeExpense };
