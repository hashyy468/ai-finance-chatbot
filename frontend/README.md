# AI Finance Assistant – Frontend

## Overview

This is the **frontend interface** for the AI Finance Assistant.  
It provides a clean, chat-based experience for interacting with both:

- Finance chatbot
- Expense categorization system

The UI is designed to feel **modern, intuitive, and fintech-grade**.

---

## Features

- Chat-based interface
- Mode toggle:
  - **BOTH** (auto-detect)
  - **EXPENSE** (force categorization)
  - **FINANCE** (force finance answers)
- Intent-aware follow-up suggestions
- Clear financial disclaimers
- Dark theme with polished UI
- Session-aware conversations

---

## Folder Structure

```text
frontend/
├── src/
│ ├── assets/          # Images and icons
│ ├── api.js           # Backend API communication
│ ├── App.jsx          # Main application logic
│ ├── App.css          # Core UI styles
│ ├── index.css        # Global styles
│ ├── main.jsx         # React entry point
│ └── theme.js         # Theme toggling logic
├── public/
├── index.html
├── vite.config.js
└── README.md
```
---

## Architecture Notes

- Uses Vite proxy to communicate with both backends

- Business logic is kept minimal in UI

- Backend decides intent and response type
- UI only renders structured responses

## High-Level Flow
```
User Input
↓
Mode Selection (BOTH / EXPENSE / FINANCE)
↓
Intent Detection (UI-level heuristics)
↓
Backend Routing
├── Expense Categorizer API
└── Finance Chatbot API
↓
Structured Response
↓
UI Rendering (message + disclaimer + follow-ups)
```
---

## Running Locally
```bash
npm install
npm run dev
```


### Frontend runs at:
```
http://localhost:5173
```
## Disclaimer Handling

- Finance responses display disclaimers automatically

- Expense categorization includes estimation disclaimers

- UI clearly differentiates informational vs actionable content


