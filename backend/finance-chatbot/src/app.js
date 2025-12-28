import express from "express";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/chat", chatRoutes);

export default app;
