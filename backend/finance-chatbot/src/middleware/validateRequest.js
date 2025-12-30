export default function validateRequest(req, res, next) {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  // Allow short but meaningful queries like "FD", "EMI?"
  if (message.trim().length < 2) {
    return res.status(400).json({ error: "Message too short" });
  }

  next();
}
