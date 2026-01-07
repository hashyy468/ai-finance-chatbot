const express = require('express');
const router = express.Router();
const {
  categorizeExpense,
  categorizeExpenseAI
} = require('../controllers/expenseController');

router.post('/categorize', categorizeExpense);
router.post('/categorize/ai', categorizeExpenseAI); // ✅ REQUIRED

module.exports = router;
