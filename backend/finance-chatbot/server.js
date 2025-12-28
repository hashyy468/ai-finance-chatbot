import 'dotenv/config';         
import app from './src/app.js';

const PORT = process.env.PORT || 4000;

console.log('GEMINI KEY LOADED:', process.env.GEMINI_API_KEY ? 'YES' : 'NO');

app.listen(PORT, () => {
  console.log(`Finance Chatbot running on http://localhost:${PORT}`);
});
