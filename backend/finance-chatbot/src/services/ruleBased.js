const definitions = {
  emi: "An EMI (Equated Monthly Installment) is a fixed monthly payment you make towards a loan. It includes both principal and interest.",

  savings: "Savings refers to the portion of your income set aside for future needs or emergencies.",

  budgeting: "Budgeting is the process of planning how your income is allocated across expenses, savings, and goals.",

  sip: "A SIP (Systematic Investment Plan) allows regular investing in mutual funds.",

  "mutual fund":
    "A mutual fund pools money from multiple investors to invest in assets like stocks or bonds.",

  fd:
    "A Fixed Deposit is a low-risk investment where money is locked in for a fixed period at a set interest rate."
};

export function getDefinition(message, intent) {
  if (intent !== "DEFINITION") return null;

  const text = message.toLowerCase();

  for (const key in definitions) {
    if (text.includes(key)) {
      return {
        response: { summary: definitions[key] }
      };
    }
  }

  return null;
}
