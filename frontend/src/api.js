// frontend/src/api.js

const FINANCE_API = 'http://localhost:4000';
const EXPENSE_API = 'http://localhost:3000';

export async function sendFinanceChat(message, sessionId) {
  const res = await fetch(`${FINANCE_API}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      sessionId, // ✅ dynamic session id
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Finance API failed');
  }

  return res.json();
}

export async function categorizeExpense(description) {
  const res = await fetch(`${EXPENSE_API}/api/categorize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Expense API failed');
  }

  return res.json();
}
