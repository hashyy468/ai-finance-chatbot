const fs = require("fs");
const path = require("path");
const { categorizeByRule } = require("../services/ruleService");

const datasetPath = path.join(__dirname, "../../data/sample_expenses.json");
const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));

let correct = 0;

dataset.forEach(item => {
  const prediction = categorizeByRule(item.text);
  if (prediction === item.label) {
    correct++;
  }
});

const accuracy = (correct / dataset.length) * 100;

console.log("Evaluation Results");
console.log("------------------");
console.log("Total samples:", dataset.length);
console.log("Correct predictions:", correct);
console.log("Accuracy:", accuracy.toFixed(2) + "%");
console.log("AI fallback rate:", (100 - accuracy).toFixed(2) + "%");
