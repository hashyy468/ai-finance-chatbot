const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const categorizeByAI = async (description) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
Categorize the following expense into exactly ONE of:
Food, Transport, Shopping, Utilities, Entertainment, Other.

Expense: "${description}"

Return only the category name.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();

    const valid = ['Food', 'Transport', 'Shopping', 'Utilities', 'Entertainment'];
    return valid.includes(response) ? response : 'Other';

  } catch (err) {
    console.error('Gemini error:', err);
    return 'Other';
  }
};

module.exports = { categorizeByAI };
