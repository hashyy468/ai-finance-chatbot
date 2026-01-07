import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  sendFinanceChat,
  categorizeExpense,
  categorizeExpenseAI
} from "./api";

import { toggleTheme } from "./theme";
import logo from "./assets/logo.png";

/**
 * Main Application Component
 * Handles:
 * - Chat UI rendering
 * - Mode routing (Finance / Expense / Both)
 * - Session management
 * - Streaming bot responses
 */
export default function App() {
  /* ------------------------- UI STATE ------------------------- */
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [chatStarted, setChatStarted] = useState(false);

  /* ---------------------- MODE TOGGLE ------------------------- */
  // BOTH | EXPENSE | FINANCE
  const [mode, setMode] = useState("finance");

  /* ------------------- SESSION MANAGEMENT -------------------- */
  // Explicit UUID usage to avoid crypto.randomUUID issues in production
  const [sessionId, setSessionId] = useState(() => uuidv4());

  /* ---------------------- REFS ------------------------------- */
  const chatEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  /* ---------------------- EFFECTS ---------------------------- */
  // Theme application
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Auto-scroll on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ------------------ UTILITY FUNCTIONS ---------------------- */

  /**
   * Heuristic to detect if input resembles an expense
   */
  function looksLikeExpense(text) {
    return /(paid|spent|rs|₹|\d+)|(uber|ola|rent|netflix|food|cab|dinner|bill)/i.test(
      text
    );
  }

  /**
   * Streams bot message character-by-character
   * Adds follow-ups and disclaimers at the end
   */
  function streamBotMessage(fullText, meta = {}) {
    let index = 0;

    // Remove existing typing bubbles
    setMessages(prev => [
      ...prev.filter(m => !m.typing),
      { role: "bot", text: "", typing: true }
    ]);

    typingTimerRef.current = setInterval(() => {
      index++;

      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (!last?.typing) return prev;

        return [
          ...prev.slice(0, -1),
          { ...last, text: fullText.slice(0, index) }
        ];
      });

      // End typing animation
      if (index >= fullText.length) {
        clearInterval(typingTimerRef.current);

        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            {
              ...last,
              typing: false,
              disclaimer: meta.disclaimer,
              followUps: meta.followUps || []
            }
          ];
        });
      }
    }, 14);
  }

  /* ------------------ MESSAGE HANDLING ----------------------- */

  /**
   * Handles user message send
   * Routes request based on mode & heuristics
   */
  async function handleSend(text) {
    if (!text.trim() || loading) return;

    if (!chatStarted) setChatStarted(true);

    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      let responseText = "";
      let followUps = [];
      let disclaimer = "";

      const isExpense = looksLikeExpense(text);

      /* ------------ EXPENSE FLOW ------------ */
      if (mode === "expense" || (mode === "both" && isExpense)) {
        let res = await categorizeExpense(text);

        if (!res?.category || res.category === "Other") {
          res = await categorizeExpenseAI(text);
        }

        const confidence =
          res.confidence > 1
            ? Math.round(res.confidence)
            : Math.round(res.confidence * 100);

        responseText =
          `📊 Expense Categorized\n\n` +
          `Category: ${res.category}\n` +
          `Method: ${res.method}\n` +
          `Confidence: ${confidence}%`;

        disclaimer =
          "This categorization is an estimate and may not be fully accurate.";
      }

      /* ------------ FINANCE FLOW ------------ */
      else {
        const data = await sendFinanceChat(text, sessionId);

        responseText = data.response.summary;
        followUps = data.response.followUps || [];

        disclaimer =
          "This is general financial information, not professional financial advice.";
      }

      // Stream response
      setTimeout(() => {
        setLoading(false);
        streamBotMessage(responseText, { followUps, disclaimer });
      }, 250);
    } catch {
      setLoading(false);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Backend not reachable. Check running servers." }
      ]);
    }
  }

  /**
   * Resets chat state and generates new session
   */
  function handleNewChat() {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    setMessages([]);
    setInput("");
    setLoading(false);
    setChatStarted(false);
    setSessionId(uuidv4());
  }

  /* ---------------------- RENDER ----------------------------- */
  return (
    <div className="app-root">
      {/* ---------------- HEADER ---------------- */}
      <header className="app-header">
        <div className="brand">
          <img src={logo} alt="AI Finance Assistant" className="brand-logo" />
          <span className="brand-title">AI Finance Assistant</span>
        </div>

        <div className="header-actions">
          <div className="mode-toggle">
            {["both", "expense", "finance"].map(m => (
              <button
                key={m}
                className={mode === m ? "active" : ""}
                onClick={() => setMode(m)}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>

          {chatStarted && (
            <button className="new-chat-btn" onClick={handleNewChat}>
              + New Chat
            </button>
          )}

          <button
            className="theme-toggle"
            onClick={() => setTheme(toggleTheme(theme))}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* ---------------- CHAT AREA ---------------- */}
      <main className="chat-area">
        <div className="chat-column">
          {!chatStarted && (
            <section className="welcome-panel">
              <h2>Hi, I’m your AI Finance Assistant</h2>
              <p className="hero-subtitle">
                Ask finance questions or categorize any expenses.
              </p>

              <div className="starter-pills">
                {[
                  "How should I budget my salary?",
                  "Credit Cards",
                  "Uber ride to airport"
                ].map(q => (
                  <button key={q} onClick={() => handleSend(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </section>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="bubble">
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {msg.text}
                </pre>

                {msg.disclaimer && (
                  <small className="disclaimer">{msg.disclaimer}</small>
                )}

                {msg.followUps?.length > 0 && (
                  <div className="followups">
                    {msg.followUps.map((q, i) => (
                      <button key={i} onClick={() => handleSend(q)}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <div className="bubble thinking">
                <span /> Thinking
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </main>

      {/* ---------------- INPUT BAR ---------------- */}
      <footer className="input-bar">
        <div className="input-wrapper">
          <input
            value={input}
            placeholder="Ask a finance question…"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend(input)}
          />
          <button onClick={() => handleSend(input)}>Send</button>
        </div>
      </footer>
    </div>
  );
}
