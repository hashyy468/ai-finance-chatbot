export function detectIntent(message) {
  const text = message.toLowerCase().trim();

  // ✅ FOLLOW-UP commands & questions (CRITICAL FIX)
  if (
    /(give me|show me|tell me|explain|apply|continue|customize|breakdown|calculate)/.test(text) ||
    /(example|next steps|what next|get next|practical example|see example)/.test(text) ||
    /(see|show|give|get|add|check|customize|apply|continue|next)\b/.test(text)  
  ) {
    return { intent: "FOLLOW_UP" };
  }
  if (/^(hi|hello|hey|hey there|hii|hiya)$/.test(text)) {
    return { intent: "GREETING" };
  }

  if (text.startsWith("what is") || text.startsWith("define")) {
    return { intent: "DEFINITION" };
  }

  if (/(budget|expense|expenses|spending|rent|utilities|bills|grocery)/.test(text)) {
    return { intent: "BUDGETING" };
  }

  if (/(invest|investment|sip|mutual|saving|savings|fd|fixed deposit)/.test(text)) {
    return { intent: "INVESTING" };
  }

  if (/(loan|emi|debt|credit card|repayment)/.test(text)) {
    return { intent: "DEBT" };
  }

  if (/(income|salary|earn|earning)/.test(text)) {
    return { intent: "FINANCE_GENERAL" };
  }

  return { intent: "OUT_OF_SCOPE" };
}
