# AI Finance Assistant – Full Stack System

## Problem Statement

Build a full-stack system that:

- Answers personal finance questions safely and explainably  
- Categorizes expenses from natural-language descriptions  
- Demonstrates AI usage with deterministic fallbacks  
- Is deployable on a cloud VM in a production-style setup  

The focus is on **architecture, correctness, safety, and deployability**, not just UI or model calls.

---

## Solution Overview

This project implements a **modular, service-based architecture** with a clean separation of concerns:

- A React frontend for user interaction  
- A finance chatbot backend for intent-aware financial guidance  
- An expense categorization backend using a hybrid NLP approach  

The system prioritizes:

- Safe AI usage (rules first, AI fallback)  
- Explainability and confidence  
- Production-style deployment without code hacks  

---

## System Architecture
```
+-------------------------------+
|  Frontend                     |
|  React + Vite                 |
|  Served via Nginx (Port 80)   |
+---------------+---------------+
                |
                | REST APIs
                |
+---------------+---------------+
| Finance Chatbot API           |
| Node.js + Express             |
| PM2 Managed (Port 4000)       |
+---------------+---------------+
                |
                |
+---------------+---------------+
| Expense Categorizer API       |
| Node.js + Express             |
| PM2 Managed (Port 3000)       |
+---------------+---------------+
                |
                | LLM fallback only
                |
        +------------------+
        | Groq LLaMA 3.1   |
        +------------------+

```
---

## Components

### Frontend (React + Vite)

- Chat-based UI  
- Mode toggle: **BOTH / FINANCE / EXPENSE**  
- Follow-up suggestions  
- Finance disclaimers  
- Responsive, dark-theme design  


---

### Finance Chatbot Backend

- Handles personal finance questions  
- Rule-based intent detection (primary)  
- AI fallback for complex queries  
- Session-based conversational context  
- Structured, safe responses  

---

### Expense Categorization Backend

- Categorizes expenses into predefined classes  
- Hybrid approach:
  - Rule-based (fast, deterministic)  
  - AI-based fallback (semantic understanding)  
- Confidence scoring and explainability  



---

## Tech Stack

- **Frontend**: React, Vite  
- **Backend**: Node.js, Express  
- **AI / LLMs**: Groq (LLaMA 3.1)  
- **Process Management**: PM2  
- **Web Server**: Nginx  
- **Cloud**: Vultr VM (Ubuntu)  

---

## Deployment Summary (Vultr)

The system has been **fully deployed on the provided Vultr instance** using SSH access.

### Deployed Services
> All backend services are managed using **PM2** for reliability and process recovery.  
> The frontend is built using **Vite** and served as static assets via **Nginx**.
```

| Service                     | Port | Status               |
|-----------------------------|------|----------------------|
| Finance Chatbot API         | 4000 | Running (PM2)        |
| Expense Categorizer API     | 3000 | Running (PM2)        |
| Frontend (React + Vite)     | 80   | Served via Nginx     |

```
---

### Deployment Characteristics

- Backend services managed via **PM2** for persistence and recovery  
- Frontend built using Vite and served as static assets via **Nginx**  
- Environment variables managed via `.env` files  
- No application logic changes required for deployment  

---

## How Deployment Can Be Verified

Deployment can be verified directly on the server:

```bash
# Check running services
pm2 list
```
### Finance chatbot API
```
curl -X POST http://localhost:4000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How should I budget my salary?","sessionId":"test"}'
```
### Expense categorization API
```
curl -X POST http://localhost:3000/api/categorize \
  -H "Content-Type: application/json" \
  -d '{"description":"Lunch at Starbucks"}'
```
Successful responses confirm:

-Services are live

-AI integrations are functional

-Rule-based and AI fallback logic works as expected

## Deployment Constraints
- The Vultr instance was provided with SSH-only access.

- Public firewall configuration (ports 80/443) is managed at the Vultr account level

- Dashboard-level permissions were not provided

- As a result, public internet exposure depends on account-level firewall rules

- Despite this, the system is fully deployed, running, and can be publicly exposed immediately once firewall access is enabled.

## Running Locally (Development)
Each module can be run independently:

### Frontend
```
cd frontend
npm install
npm run dev
```
### Finance-chatbot backend
```
cd backend/finance-chatbot
npm install
npm start
```
# Expense-categorizer backend
```
cd backend/expense-categorizer
npm install
npm start
```
## Key Engineering Decisions
- Clear separation between frontend and backend services

- Deterministic logic prioritized before AI calls

- PM2 used for backend reliability

- Nginx used for production-grade frontend hosting

- No tunneling or temporary exposure tools used

## Future Enhancements
- Persistent user budgets and expense history

- Visual analytics and charts

- User authentication

- Multi-currency support

- Improved intent disambiguation

- Containerized deployment (Docker)