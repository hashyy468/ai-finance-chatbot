import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: '*', // dev-safe
}));

app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use('/api/chat', chatRoutes);

/* ---------------- HEALTH CHECK ---------------- */
app.get('/', (req, res) => {
  res.send('Finance Chatbot API is running');
});

export default app;
