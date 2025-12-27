# AI Finance Chatbot – Expense Categorization Backend

This repository contains the backend service for an AI-powered finance chatbot.
The current implementation focuses on expense categorization, which will later be extended into a full personal finance assistant.

The backend is built using Node.js and Express, follows clean architecture principles, and is designed to be incrementally extensible.

---

## 🎯 Objective

Automatically categorize transaction descriptions into meaningful financial categories using a hybrid approach:

- Rule-based categorization for speed and determinism
- AI-based fallback using Google Gemini when rules fail

This ensures performance, accuracy, and cost efficiency.

---

## ✨ Current Scope (Phase 1)

### Implemented
- Expense categorization from transaction descriptions
- Rule-based keyword matching
- AI fallback using Google Gemini API
- Single REST API endpoint
- Clean folder structure and separation of concerns

### Not Included Yet
- Frontend (React/UI)
- Database storage
- Authentication
- Conversational memory

---

## 🧱 Technology Stack

- Backend: Node.js, Express
- AI Integration: Google Gemini API
- Environment Config: dotenv
- API Style: REST

---

## 📂 Project Structure

```text

backend/expense-categorizer/
├── src/
│   ├── controllers/        # Request handling logic
│   ├── routes/             # API routes
│   ├── services/           # Business logic (rules + AI)
│   └── app.js              # Express app configuration
├── server.js               # Server entry point
├── package.json
├── package-lock.json
└── .env                    # Environment variables (ignored)
```
---

## ⚙️ Setup Instructions (Local)

1. Clone the repository

git clone https://github.com/hashyy468/ai-finance-chatbot.git

2. Navigate to the backend directory

cd ai-finance-chatbot/backend/expense-categorizer

3. Install dependencies

npm install

4. Configure environment variables

Create a .env file inside backend/expense-categorizer/ with the following:

PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key

5. Start the server

node server.js

Server will run at:
http://localhost:3000

---

## 🔌 API Documentation

Endpoint:
POST /api/categorize

Request Body:
{
  "description": "Lunch at Starbucks"
}

Response (Rule-based):
{
  "description": "Lunch at Starbucks",
  "category": "Food",
  "method": "rule"
}

Response (AI Fallback):
{
  "description": "Monthly subscription for skydiving lessons",
  "category": "Entertainment",
  "method": "ai"
}

---

## 🧠 How It Works

1. Request is validated
2. Rule-based categorization is attempted
3. If no rule matches, Gemini AI is used
4. Response includes category and method used

---

## 🚀 Future Enhancements

- Database integration
- Conversational finance chatbot (Task A)
- Budgeting & savings insights
- User authentication
- Deployment on Vultr (production-ready)

