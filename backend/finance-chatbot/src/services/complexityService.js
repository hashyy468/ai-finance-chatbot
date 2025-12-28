/**
 * Determines whether a question is simple or complex.
 *
 * Simple:
 * - Definitions
 * - Basic "what is" questions
 * - One-line finance queries
 *
 * Complex:
 * - "how", "why", "should I"
 * - comparisons
 * - explanations
 */
export function isSimpleQuestion(message) {
  const text = message.toLowerCase();

  // Keywords that usually require explanation
  const complexKeywords = [
    "how",
    "why",
    "should i",
    "which is better",
    "compare",
    "difference",
    "advise",
    "explain",
    "recommend"
  ];

  // If any complex keyword exists → NOT simple
  for (const keyword of complexKeywords) {
    if (text.includes(keyword)) {
      return false;
    }
  }

  // Short factual questions are simple
  return true;
}
