/**
 * Finance Chat API
 */
export async function sendFinanceChat(message, sessionId) {
  const res = await fetch("/chat/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId })
  });

  if (!res.ok) throw new Error("Finance API failed");
  return res.json();
}

/**
 * Rule-based Expense Categorization
 */
export async function categorizeExpense(description) {
  const res = await fetch("/api/categorize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description })
  });

  if (!res.ok) throw new Error("Expense API failed");
  return res.json();
}

/**
 * AI Expense Categorization (fallback)
 */
export async function categorizeExpenseAI(description) {
  const res = await fetch("/api/categorize/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description })
  });

  if (!res.ok) throw new Error("Expense AI failed");
  return res.json();
}
