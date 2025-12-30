const memory = new Map();

export function getContext(sessionId) {
  return memory.get(sessionId) || [];
}

export function saveContext(sessionId, role, content) {
  const history = memory.get(sessionId) || [];

  history.push({ role, content });

  if (history.length > 6) history.shift();

  memory.set(sessionId, history);
}

export function clearContext(sessionId) {
  memory.delete(sessionId);
}
