export default function validateRequest(req, res, next) {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  if (message.length < 3) {
    return res.status(400).json({ error: "Message too short" });
  }

  next();
}
