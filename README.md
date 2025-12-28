# AI Finance Platform

An AI-powered finance platform developed as part of a technical assignment.  
This repository demonstrates backend-focused financial intelligence using a **hybrid approach** that combines **rule-based logic** with **LLM-powered reasoning**.

---

## 📌 Project Overview

This repository contains two independent backend systems:

### 1️⃣ Expense Categorization System
A service that categorizes transaction descriptions (e.g., bank statements) into predefined expense categories using NLP and rule-based logic.

### 2️⃣ AI Finance Chatbot
A virtual finance assistant that answers personal finance queries related to:
- Budgeting
- Savings
- Credit cards
- EMIs
- Basic investing

The chatbot uses **intent detection**, **rule-based responses**, and **LLM reasoning with fallback support** to ensure reliability.

---

## 🧠 Architecture Philosophy

- **Hybrid Intelligence**
  - Rule-based responses for fast, deterministic answers
  - LLM-based reasoning for complex explanations
- **Fail-safe Design**
  - System always responds, even if the LLM is slow or unavailable
- **Backend-First Approach**
  - REST APIs designed for easy frontend or client integration
- **Deployment-Oriented**
  - Optimized for low-resource servers (2 vCPU, 2GB RAM)

---

## 📁 Repository Structure

```text
backend/
├── expense-categorizer/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── README.md        # Expense Categorizer documentation
│
├── finance-chatbot/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── README.md        # Finance Chatbot documentation
│
└── README.md            # Root project overview (this file)
```
Each backend module has its own README explaining:

- Architecture

- Setup

- API endpoints

- Design decisions

## 🛠 Tech Stack

- **Programming Language**: JavaScript (Node.js)

- **Backend Framework**: Express.js

- AI Integration:

  - Ollama (local LLMs like ```phi```)

  - Rule-based deterministic systems

- **API Testing**: Postman

- **Deployment Target**: Vultr (2 vCPU, 2GB RAM)

## 🚀 Getting Started

Each service can be run independently.

Refer to:

- ```backend/expense-categorizer/README.md```

- ```backend/finance-chatbot/README.md```

for detailed setup instructions and API usage.

## 📌 Notes

- **Frontend (React.js)** will be added later.

- API-first design allows seamless frontend or mobile integration.

- Focus of this project is on backend **correctness**, **reliability**, and **explainability**.