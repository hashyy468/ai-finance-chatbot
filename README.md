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
## Live Deployment

The application has been deployed on a **Vultr Ubuntu VM**.

### 🌐 Live URL
http://155.138.225.140/

## System Architecture
```
## System Architecture

Frontend (React + Vite)
↓

Finance Chatbot API (Node.js + Express)
↓

Expense Categorizer API (Node.js + Express)
↓

Groq LLaMA 3.1 (LLM fallback only)
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

- Hybrid NLP approach
- Rule-first logic
- AI fallback for ambiguity
- Confidence scoring

---

### Expense Categorization Backend

- Hybrid NLP approach
- Rule-first logic
- AI fallback for ambiguity
- Confidence scoring  



---

## Tech Stack

- **Frontend**: React, Vite  
- **Backend**: Node.js, Express  
- **AI / LLMs**: Groq (LLaMA 3.1)  
- **Process Management**: PM2  
- **Web Server**: Nginx  
- **Cloud**: Vultr VM (Ubuntu)  

---
## Project Structure

/frontend /backend

Each folder contains its own README with setup instructions.

___


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

## Deployment Verification
Deployment can be verified directly on the server:

### Check running services
```bash
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


## Key Engineering Decisions
- Clear separation between frontend and backend services
- Deterministic logic prioritized before AI calls
- PM2 used for backend reliability
- Nginx used for frontend hosting
- No tunneling or temporary exposure tools used

## Future Enhancements
- Persistent budgets and history
- Analytics dashboards
- User Authentication
- Dockerized deployment