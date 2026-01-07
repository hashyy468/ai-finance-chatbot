import { useState, useEffect, useRef } from "react";
import {
  sendFinanceChat,
  categorizeExpense,
  categorizeExpenseAI
} from "./api";
import { toggleTheme } from "./theme";
import logo from "./assets/logo.png";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [chatStarted, setChatStarted] = useState(false);

  //  mode toggle: BOTH | EXPENSE | FINANCE
  const [mode, setMode] = useState("finance");

  function generateSessionId() {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 10)
    );
  }

  const [sessionId, setSessionId] = useState(() => generateSessionId());

  const chatEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function looksLikeExpense(text) {
    return /(paid|spent|rs|₹|\d+)|(uber|ola|rent|netflix|food|cab|dinner|bill)/i.test(
      text
    );
  }

  function streamBotMessage(fullText, meta = {}) {
    let index = 0;

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

        followUps = [];

        disclaimer =
          "This categorization is an estimate and may not be fully accurate.";
      } else {
        const data = await sendFinanceChat(text, sessionId);

        responseText = data.response.summary;

        // ✅ FIX: USE BACKEND FOLLOW-UPS (NO HARDCODING)
        followUps = data.response.followUps || [];

        disclaimer =
          "This is general financial information, not professional financial advice.";
      }

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

  function handleNewChat() {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setMessages([]);
    setInput("");
    setLoading(false);
    setChatStarted(false);
    setSessionId(generateSessionId());
  }

  return (
    <div className="app-root">
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
