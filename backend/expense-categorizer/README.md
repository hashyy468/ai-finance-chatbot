# AI Finance Chatbot – Backend (Expense Categorization Service)

## Overview

This repository contains the **backend foundation** for an AI-powered finance chatbot.
The first implemented module is an **Expense Categorization Service**, which classifies
transaction descriptions into predefined financial categories.

This backend is designed with **clean architecture, scalability, and production-readiness**
in mind and will be incrementally extended to support full chatbot functionality.

---

## Why Expense Categorization?

Expense categorization is a **core building block** of personal finance systems.

Before a chatbot can:
- Analyze spending
- Suggest budgets
- Detect anomalies
- Provide recommendations

…it must first **understand where money is being spent**.

This service solves that problem in a reliable and cost-efficient way.

---

## Dual-Layer Categorization Strategy

The system uses a **hybrid approach**:

### 1. Rule-Based Categorization (Primary)
- Fast and deterministic
- Uses keyword matching (e.g. "Starbucks" → Food)
- Zero API cost
- Handles common and predictable transactions

### 2. AI-Based Categorization (Fallback)
- Triggered only when rules fail
- Uses Google Gemini LLM for semantic understanding
- Handles ambiguous or unseen descriptions
- Ensures high coverage without overusing AI

This design balances **performance, cost, and accuracy**.

---

## Project Structure

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

## Setup Instructions (Local)

### 1. Clone the repository
```bash
git clone https://github.com/hashyy468/ai-finance-chatbot.git
```

### 2. Navigate to the backend directory
```bash
cd ai-finance-chatbot/backend/expense-categorizer
```

### 3. Install dependencies
```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file inside `backend/expense-categorizer/`:

```env
PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key
```

### 5. Start the server
```bash
node server.js
```

Server will run at:
```
http://localhost:3000
```

---

## API Documentation

### POST `/api/categorize`

Categorizes a transaction description into a financial category.

#### Request Body
```json
{
  "description": "Lunch at Starbucks"
}
```

#### Response (Rule-based)
```json
{
  "description": "Lunch at Starbucks",
  "category": "Food",
  "method": "rule"
}
```

#### Response (AI fallback)
```json
{
  "description": "Monthly subscription for skydiving lessons",
  "category": "Entertainment",
  "method": "ai"
}
```

---

## How It Works

1. Request is validated at the controller layer
2. Rule-based categorization is attempted first
3. If no rule matches, Gemini AI is invoked
4. Response includes both category and method used

---




