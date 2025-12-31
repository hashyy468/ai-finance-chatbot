
# AI Finance Chatbot – Backend

## Overview

This service powers the **finance question-answering capability** of the AI Finance Assistant.

It is designed with **safety, predictability, and real-world fintech constraints** in mind.

---

## Features

- Answers questions on:
  - Budgeting
  - Savings
  - EMIs
  - Credit
  - Basic investing
- Intent detection
- Rule-based guaranteed responses
- LLM-powered explanations
- Session-based memory
- Follow-up suggestions
- Mandatory disclaimers

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

- Deterministic logic ensures safety

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
    "Can you give an example?",
    "How do I apply this?"
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