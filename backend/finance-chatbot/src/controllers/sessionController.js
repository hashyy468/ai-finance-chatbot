import { clearContext } from "../services/memoryService.js";

export function resetSession(req, res) {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: "sessionId required" });
  }

  clearContext(sessionId);

  return res.json({ message: "Session reset successfully" });
}
