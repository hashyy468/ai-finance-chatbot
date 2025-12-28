import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function checkModels() {
  const models = await genAI.listModels();
  console.log("AVAILABLE MODELS:");
  console.dir(models, { depth: null });
}

checkModels().catch(console.error);
