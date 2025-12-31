# AI Finance Assistant – Full Stack System

## Overview

This repository contains a **full-stack AI-powered finance assistant** that helps users:

- Ask personal finance questions (budgeting, savings, EMIs, investing)
- Categorize expenses from natural language inputs
- Receive explainable, safe, and structured responses

The system is built using a **modular, production-style architecture** with clear separation between:
- Frontend (UI & interaction logic)
- Finance Chatbot Backend (intent-aware financial reasoning)
- Expense Categorization Backend (hybrid rule + AI system)

---

## System Components

### Frontend (React + Vite)
- Modern chat-based UI
- Mode toggle: **BOTH / EXPENSE / FINANCE**
- Follow-up suggestions
- Disclaimers for finance-related responses
- Clean, responsive, dark-theme design
~~~
 `frontend/`
~~~
---

###  Finance Chatbot Backend
- Handles finance-related questions
- Uses deterministic rules + LLM fallback
- Safe responses with disclaimers
- Session-based memory support
~~~
 `backend/finance-chatbot/`
~~~
---

###  Expense Categorization Backend
- Categorizes expenses into predefined categories
- Hybrid approach:
  - Rule-based (fast, deterministic)
  - AI-based fallback (semantic understanding)
- Confidence scoring & explainability
~~~
 `backend/expense-categorizer/`
~~~
---

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **LLMs**:
  - Finance chatbot → Groq (LLaMA 3.1)
  - Expense categorization → Groq (LLaMA 3.1)
- **Architecture Style**: Modular, service-based

---

## Project Structure
~~~
ai-finance-assistant/
├── frontend/
├── backend/
│ ├── finance-chatbot/
│ └── expense-categorizer/
├── README.md
~~~
---

## Future Enhancements

- Persistent user budgets & expense history
- Visual analytics (charts for spending & savings)
- User authentication
- Multi-currency support
- Configurable confidence scoring
- Better intent disambiguation
- Production deployment (Docker + cloud)

---

## Running the Project

Each module has its own `README.md` with setup instructions.  
Please refer to them individually for local development.
