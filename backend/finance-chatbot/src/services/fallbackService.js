/**
 * Deterministic fallback responses based on intent.
 */
export function ruleBasedFinanceFallback(intent) {
  switch (intent) {
    case "savings":
      return {
        summary:
          "A good rule of thumb is to save at least 20% of your monthly income. Start with a smaller amount if needed and increase gradually.",
        followUps: [
          "Do you have an emergency fund?",
          "Would you like help calculating your savings goal?"
        ]
      };

    case "budgeting":
      return {
        summary:
          "A popular budgeting method is the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings.",
        followUps: [
          "Would you like help creating a monthly budget?",
          "Do you want to track your expenses?"
        ]
      };

    case "investing":
      return {
        summary:
          "For beginners, diversified mutual funds are a common investment choice. Always consider your risk tolerance and time horizon.",
        followUps: [
          "What is your investment time horizon?",
          "Are you comfortable with market fluctuations?"
        ]
      };

    case "credit":
      return {
        summary:
          "Using credit responsibly means paying EMIs on time and avoiding excessive debt to maintain a healthy credit score.",
        followUps: [
          "Do you currently have any active loans?",
          "Would you like tips on reducing debt?"
        ]
      };

    default:
      return {
        summary:
          "Managing finances involves budgeting, controlled spending, regular savings, and cautious borrowing.",
        followUps: [
          "What financial topic would you like help with?",
          "Do you want assistance with budgeting or saving?"
        ]
      };
  }
}
