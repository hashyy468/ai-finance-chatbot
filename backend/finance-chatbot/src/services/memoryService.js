const memory = new Map();

export function getContext(sessionId) {
  return memory.get(sessionId) || [];
}

export function saveContext(sessionId, message) {
  const history = memory.get(sessionId) || [];
  history.push(message);

  if (history.length > 5) history.shift();

  memory.set(sessionId, history);
}
