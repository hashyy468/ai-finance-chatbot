# AI Finance Chatbot – Backend

## Overview

This directory contains the **backend implementation** of an AI-powered finance chatbot.
The system is designed to answer common personal finance questions in a **safe, reliable, and production-oriented manner**.

The chatbot uses a **hybrid intelligence architecture**, combining:
- Deterministic rule-based logic for speed and correctness
- AI reasoning via a local Large Language Model (LLM) for complex explanations

This design mirrors real-world fintech systems where reliability and safety are prioritized.

---

## Features

- Answers questions related to:
  - Budgeting
  - Savings
  - Credit cards
  - EMIs
  - Basic investing
- Automatic intent detection
- Complexity-based routing (simple vs complex questions)
- Rule-based fallback for guaranteed responses
- LLM reasoning for explanatory queries
- Structured responses with disclaimers
- Automated follow-up suggestions

---

## High-Level Architecture
```
User Query
↓
Intent Detection (Rule-Based)
↓
Complexity Detection
├── Simple Query → Rule-Based Engine
└── Complex Query → LLM (Ollama - phi)
├── Timeout Protection
└── Rule-Based Fallback
↓
Structured JSON Response
```

### Why This Architecture?

- Finance is a sensitive domain → deterministic logic ensures safety
- LLMs are powerful but unreliable → fallback guarantees stability
- Local inference avoids dependency on paid or unstable APIs
- Timeout protection ensures good user experience

---

## Technology Stack

- Node.js (LTS)
- Express.js
- REST APIs
- Ollama (local LLM inference)
- LLM Model: `phi` (lightweight, CPU-friendly)
- JavaScript (ES Modules)

---

## Project Structure
```text
finance-chatbot/
├── src/
│ ├── controllers/ # HTTP request handling
│ ├── routes/ # API route definitions
│ ├── services/
│ │ ├── chatService.js # Core orchestration logic
│ │ ├── intentService.js # Intent detection
│ │ ├── complexityService.js # Simple vs complex routing
│ │ ├── fallbackService.js # Rule-based responses
│ └── prompts/
│  └── financePrompt.js # Prompt engineering
├── app.js # Express app configuration
├── server.js # Server entry point
├── package.json
├── .env.example
└── README.md
```

---

## Core Components

### Intent Detection
Deterministic logic identifies the user’s intent (e.g., savings, budgeting, credit).
This avoids unnecessary AI calls and ensures predictable behavior.

### Complexity Detection
Queries are classified as:
- **Simple**: Definitions or best practices → handled by rules
- **Complex**: Explanations or reasoning → handled by LLM

### Rule-Based Engine
Used for:
- Simple finance questions
- Guaranteed fallback when AI fails
- Safe and deterministic responses

### LLM Integration (Ollama)
- Uses local inference via Ollama
- Model: `phi`
- Timeout-protected
- Output is sanitized before returning to clients

---

## API Documentation

### POST `/api/chat`

Handles a single chatbot message.

#### Request Body
```json
{
  "message": "How much should I save every month?",
  "sessionId": "user-123"
}
```
### Response Body
```json
{
  "intent": "savings",
  "response": {
    "summary": "A common guideline is to save at least 20% of your monthly income to build financial security.",
    "disclaimer": "This information is for educational purposes only and not financial advice."
  },
  "followUps": [
    "Do you already have an emergency fund?",
    "Would you like help creating a savings plan?"
  ]
}
```
## Environment Setup
### Prerequisites

- Node.js (v18 or later)
- Ollama installed locally

### Install LLM Model
```bash
ollama pull phi
```

### Environment Variables

Create a .env file using the example below:
```bash
PORT=4000
```
### Running the Backend Locally
```text
npm install
node server.js
```


### Server will start at:
```text
http://localhost:4000
```

