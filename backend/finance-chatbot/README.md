
# AI Finance Chatbot – Backend

## Overview

This service powers the **finance question-answering capability** of the AI Finance Assistant.

It is designed with **safety, predictability, and real-world fintech constraints** in mind.

---

- Answers questions on:
  - Budgeting
  - Savings
  - EMIs
  - Credit cards
  - Basic investing
- Rule-based intent detection
- Deterministic responses for sensitive queries
- LLM-powered explanations when required
- Session-based conversational memory
- Context-aware follow-up suggestions
- Mandatory financial disclaimers

---

## Architecture

```text
User Query
↓
Intent Detection (Rule-Based)
↓
Routing Logic
├── Simple → Rule-Based Responses
└── Complex → LLM (Local via Groq)
↓
Post-Processing
├── Disclaimer Injection
└── Follow-Up Suggestions
↓
Structured JSON Response
```
## Why This Architecture?

- Finance is a sensitive domain
- Rules ensure safety and predictability
- LLM adds flexibility without risking hallucinations
- Local inference avoids external API dependency

## Folder Structure
```
finance-chatbot/
├── src/
│ ├── controllers/     # Request handling
│ ├── routes/          # API routing
│ ├── services/
│ │ ├── chatService.js
│ │ ├── intentService.js
│ │ ├── memoryService.js
│ │ └── ruleBased.js
│ └── prompts/
│   └── financePrompt.js
├── app.js
├── server.js
├── package.json
└── README.md
```

## API Endpoint
### POST ```/api/chat```
### Request
```
{
  "message": "How should I budget my salary?",
  "sessionId": "user-1"
}
```
### Response
```
{
  "response": {
    "summary": "A common guideline is the 50-30-20 rule...",
    "disclaimer": "This is general financial information, not financial advice."
  },
   "followUps": [
    "See a practical example",
    "Customize this plan"
  ]
}
```

### Running Locally
```
npm install
node server.js
```

### Server runs at:

``` 
http://localhost:4000 
```