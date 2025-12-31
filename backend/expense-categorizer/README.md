
---

# Expense Categorization System (Task B)

## Overview

This service categorizes natural-language expense descriptions into financial categories
using a **hybrid NLP architecture**.

The system is designed to be:
- Accurate
- Explainable
- Cost-efficient
- Production-ready

---

## Categories

- Food
- Transport
- Shopping
- Utilities
- Entertainment
- Other

---

## Architecture

### Hybrid Categorization Strategy

#### 1️⃣ Rule-Based Engine (Primary)
- Keyword matching
- Deterministic & fast
- Zero API cost
- High precision for common expenses

#### 2️⃣ AI-Based Categorization (Fallback)
- Triggered when rules return "Other"
- Uses **Groq (LLaMA 3.1)**
- Handles ambiguous or unseen descriptions

This approach balances **reliability, scalability, and cost**.

---

## Folder Structure

```text
expense-categorizer/
├── src/
│ ├── controllers/     # HTTP request handlers
│ ├── routes/          # API routes
│ ├── services/
│ │ ├── ruleService.js # Rule-based logic
│ │ └── aiService.js   # LLM fallback
│ ├── evaluation/      # Rule evaluation helpers
│ └── app.js
├── server.js
├── package.json
└── README.md
```


## API Endpoint
### POST  ``` /api/categorize ```
### Request
```
{
  "description": "Lunch at Starbucks"
}
```
### Response
```
{
  "category": "Food",
  "method": "rule",
  "confidence": 0.9
}
```
### Confidence Score

- Rule-based responses return fixed confidence (0.9)

- AI responses may vary in confidence

- Confidence reflects heuristic reliability, not certainty

### Running Locally
```
npm install
node server.js
```

### Server runs at:
```
http://localhost:3000
```