const fs = require("fs");
const path = require("path");

const { categorizeByRule } = require("../src/services/ruleService");
const { categorizeByAI } = require("../src/services/aiService");

const datasetPath = path.join(__dirname, "../data/sample_expenses.json");

async function evaluate() {
  const data = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));

  let correct = 0;
  let total = data.length;

  console.log("Evaluating expense categorization accuracy...\n");

  for (const item of data) {
    const { description, label } = item;

    let prediction = categorizeByRule(description);
    let method = "rule";

    if (!prediction) {
      prediction = await categorizeByAI(description);
      method = "ai";
    }

    const isCorrect = prediction === label;
    if (isCorrect) correct++;

    console.log(
      `[${method.toUpperCase()}] "${description}" → ${prediction} ${
        isCorrect ? "✓" : `✗ (expected ${label})`
      }`
    );
  }

  const accuracy = ((correct / total) * 100).toFixed(2);

  console.log("\n==============================");
  console.log(`Total samples : ${total}`);
  console.log(`Correct       : ${correct}`);
  console.log(`Accuracy      : ${accuracy}%`);
  console.log("==============================\n");
}

evaluate();
