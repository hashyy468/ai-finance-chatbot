/**
 * Detects user intent using rule-based NLP.
 * This runs BEFORE calling any LLM.
 */
export function detectIntent(message) {
  const text = message.toLowerCase();

  if (text.includes("save") || text.includes("saving")) {
    return "savings";
  }

  if (text.includes("budget")) {
    return "budgeting";
  }

  if (text.includes("invest") || text.includes("mutual")) {
    return "investing";
  }

  if (text.includes("credit") || text.includes("emi") || text.includes("loan")) {
    return "credit";
  }

  return "general_finance";
}
