const express = require('express');
const router = express.Router();
const { categorizeExpense } = require('../controllers/expenseController');

// API endpoint
router.post('/categorize', categorizeExpense);

module.exports = router;
