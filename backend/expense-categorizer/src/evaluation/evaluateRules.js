const fs = require("fs");
const path = require("path");
const { categorizeByRule } = require("../services/ruleService");

const datasetPath = path.join(__dirname, "../../data/sampleexpenses.json");
const dataset = JSON.parse(fs.readFileSync(datasetPath, "utf-8"));

let correct = 0;
let covered = 0;

dataset.forEach(item => {
  const result = categorizeByRule(item.description);
  if (result) {
    covered++;
    if (result.category === item.label) {
      correct++;
    }
  }
});

console.log("Expense Categorization Evaluation");
console.log("--------------------------------");
console.log("Total samples:", dataset.length);
console.log("Rule-covered samples:", covered);
console.log("Correct predictions:", correct);
console.log("Rule accuracy:", ((correct / covered) * 100).toFixed(2) + "%");
console.log(
  "AI fallback rate:",
  (((dataset.length - covered) / dataset.length) * 100).toFixed(2) + "%"
);
