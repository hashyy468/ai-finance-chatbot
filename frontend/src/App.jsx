import { useState, useEffect, useRef } from "react";
import { sendFinanceChat } from "./api";
import { toggleTheme } from "./theme";
import logo from "./assets/logo.png";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [chatStarted, setChatStarted] = useState(false);

  // ✅ sessionId per chat
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());

  const chatEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  /* ===============================
     THEME HANDLING
     =============================== */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ===============================
     STREAMING (TYPEWRITER)
     =============================== */
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
        if (!last || !last.typing) return prev;

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
    }, 16);
  }

  /* ===============================
     SEND MESSAGE
     =============================== */
  async function handleSend(text) {
    if (!text.trim() || loading) return;

    if (!chatStarted) setChatStarted(true);

    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendFinanceChat(text, sessionId); // ✅ pass sessionId

      setTimeout(() => {
        setLoading(false);
        streamBotMessage(data.response.summary, {
          disclaimer: data.response.disclaimer,
          followUps: data.followUps
        });
      }, 300);

    } catch {
      setLoading(false);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Unable to reach the server." }
      ]);
    }
  }

  /* ===============================
     NEW CHAT RESET (CRITICAL FIX)
     =============================== */
  function handleNewChat() {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    setMessages([]);
    setInput("");
    setLoading(false);
    setChatStarted(false);

    // ✅ brand-new session → backend memory cleared
    setSessionId(crypto.randomUUID());
  }

  return (
    <div className="app-root">
      {/* HEADER */}
      <header className="app-header">
        <div className="brand">
          <img src={logo} alt="AI Finance Assistant" className="brand-logo" />
          <span className="brand-title">AI Finance Assistant</span>
        </div>

        <div className="header-actions">
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

      {/* CHAT AREA */}
      <main className="chat-area">
        {chatStarted && <div className="chat-rail" />}

        <div className="chat-column">
          {!chatStarted && (
            <section className="welcome-panel">
              <h2>Hi, I’m your AI Finance Assistant</h2>
              <p className="hero-subtitle">
                Ask about savings, budgeting, EMIs, credit cards, or smarter financial decisions.
              </p>

              <div className="starter-pills">
                {[
                  "How should I budget my salary?",
                  "Is EMI better than a credit card?",
                  "How much should I save monthly?"
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
                <p>{msg.text}</p>

                {!msg.typing && msg.disclaimer && (
                  <small className="disclaimer">{msg.disclaimer}</small>
                )}

                {!msg.typing && msg.followUps?.length > 0 && (
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
                <span />
                Thinking
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {chatStarted && <div className="chat-rail" />}
      </main>

      {/* INPUT */}
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
