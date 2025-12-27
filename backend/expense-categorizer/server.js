// Load environment variables from .env file
require('dotenv').config();

// Import the Express app
const app = require('./src/app');

// Define port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
