
# Expense Categorization System (Task B)

## Overview

This service categorizes natural-language expense descriptions into predefined
financial categories using a **hybrid NLP architecture**.

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

## Dataset Explanation

This project does **not rely on a static labeled dataset**.

Instead, it uses a **logic-first categorization strategy** based on real-world
expense patterns commonly found in personal finance applications.

### Rule-Based Knowledge Source
- Manually curated keyword mappings (e.g., `Uber → Transport`, `Starbucks → Food`)
- Inspired by:
  - Bank transaction descriptions
  - Expense tracking apps
  - Common merchant naming conventions
- Designed to maximize **precision** for frequent, predictable expenses

### AI Fallback Understanding
- Used only when rule-based logic returns `"Other"`
- The LLM generalizes from:
  - Natural language semantics
  - Contextual spending patterns
- This allows handling:
  - New merchants
  - Ambiguous descriptions
  - Free-form user input

This approach avoids dataset bias, reduces maintenance overhead,
and mirrors how real fintech systems scale categorization logic.

---

## Architecture

### Hybrid Categorization Strategy

#### 1️⃣ Rule-Based Engine (Primary)
- Keyword matching
- Deterministic & fast
- Zero API cost
- High precision for common expenses

#### 2️⃣ AI-Based Categorization (Fallback)
- Triggered only when rules fail
- Uses **Groq (LLaMA 3.1)**
- Handles unseen or ambiguous inputs

This hybrid approach balances **reliability, scalability, and cost**.

---

## Accuracy & Evaluation

This system does not use a traditional labeled dataset.

Instead, accuracy is evaluated using a logic-driven validation approach designed for real-world expense systems.

### **Rule-Based Evaluation**

- Keywords are manually mapped to categories
- Tested against common real-life expense descriptions such as:
  - “Uber ride to airport”
  - “Lunch at Starbucks”
- Rule matches are deterministic and consistently accurate for known patterns

This provides high precision for frequent expense types.

### **AI-Based Evaluation (Fallback)**

- Activated only when rules return ```"Other"```
- AI categorization is evaluated qualitatively based on:
  - Semantic correctness
  - Category relevance
  - Consistency across similar inputs

This mirrors how production fintech systems handle unseen merchants and ambiguous text.

## Confidence Score & Normalization

Each response includes a confidence score to indicate relative reliability, not certainty.

**Rule-Based Responses**

- Fixed confidence score: ```0.9```
- Represents deterministic keyword certainty

**AI-Based Responses**

- Confidence returned by model
- Normalized to percentage format in frontend
- Ensures consistent UI representation

Confidence values are heuristic indicators used for transparency, not guarantees.

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

### Running Locally
```
npm install
node server.js
```

### Server runs at:
```
http://localhost:3000
```