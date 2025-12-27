const express = require('express');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Allow JSON body
app.use(express.json());

// API routes
app.use('/api', expenseRoutes);

// Error handler (safety)
app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

module.exports = app;
