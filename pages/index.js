import { useState, useRef, useEffect } from "react";

const QUICK_PROMPTS = [
  "Build me a 4-day workout plan",
  "What should I eat to lose fat?",
  "Best recovery tips after leg day",
  "How do I calculate my macros?",
];

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 0" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          display: "inline-block", width: 7, height: 7,
          borderRadius: "50%", background: "#00ff88",
          animation: `blink 1.2s infinite ${i * 0.4}s`,
        }} />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      marginBottom: 18,
      display: "flex",
      flexDirection: "column",
      alignItems: isUser ? "flex-end" : "flex-start",
    }}>
      <div style={{
        fontSize: 11, color: isUser ? "#888" : "#00ff88",
        marginBottom: 4, fontFamily: "monospace", letterSpacing: 1,
      }}>
        {isUser ? "YOU" : "Gold GYM"}
      </div>
      <div style={{
        maxWidth: "85%",
        background: isUser ? "#1a1a2e" : "#0d1f0d",
        border: isUser ? "1px solid #333" : "1px solid #00ff8840",
        borderRadius: 4, padding: "10px 14px",
        color: isUser ? "#ccc" : "#b8ffdc",
        fontFamily: "monospace", fontSize: 13, lineHeight: 1.7,
        whiteSpace: "pre-wrap", wordBreak: "break-word",
        boxShadow: isUser ? "none" : "0 0 12px #00ff8815",
      }}>
        {msg.content}
      </div>
    </div>
  );
}

export default function FitnessCoach() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content || "No response received.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("Connection failed. Check your network and try again.");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  const isEmpty = messages.length === 0;

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      fontFamily: "monospace", color: "#ccc",
    }}>
      <style>{`
        @keyframes blink { 0%,80%,100%{opacity:0.2} 40%{opacity:1} }
        @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:0.97} 94%{opacity:0.93} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #1e3d1e; border-radius: 2px; }
        textarea:focus { outline: none; }
        textarea { resize: none; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1a3a1a", padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#0d0d0d", animation: "flicker 8s infinite",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #00ff88, #005533)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, boxShadow: "0 0 14px #00ff8860",
          }}>⚡</div>
          <div>
            <div style={{ color: "#00ff88", fontSize: 15, fontWeight: "bold", letterSpacing: 2 }}>Gold GYM</div>
            <div style={{ color: "#446644", fontSize: 10, letterSpacing: 1 }}>AI FITNESS COACH v1.0</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#00ff88", letterSpacing: 1, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#00ff88",
            display: "inline-block", boxShadow: "0 0 6px #00ff88",
            animation: "blink 2s infinite",
          }} />
          ONLINE
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "20px 20px 10px",
        maxWidth: 760, width: "100%", margin: "0 auto", boxSizing: "border-box",
      }}>
        {isEmpty && (
          <div style={{ textAlign: "center", marginTop: 40, marginBottom: 30 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🏋️</div>
            <div style={{ color: "#00ff88", fontSize: 16, letterSpacing: 2, marginBottom: 8 }}>Gold GYM READY</div>
            <div style={{ color: "#446644", fontSize: 12, marginBottom: 30, lineHeight: 1.8 }}>
              Your AI-powered fitness coach.<br />Ask anything about training, nutrition, or recovery.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxWidth: 480, margin: "0 auto" }}>
              {QUICK_PROMPTS.map((p, i) => (
                <button key={i} onClick={() => sendMessage(p)} style={{
                  background: "transparent", border: "1px solid #1e4a1e",
                  color: "#5a9a5a", padding: "10px 12px", borderRadius: 4,
                  cursor: "pointer", fontFamily: "monospace", fontSize: 11,
                  textAlign: "left", lineHeight: 1.4,
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#00ff88";
                    e.currentTarget.style.color = "#00ff88";
                    e.currentTarget.style.background = "#0d1f0d";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#1e4a1e";
                    e.currentTarget.style.color = "#5a9a5a";
                    e.currentTarget.style.background = "transparent";
                  }}>
                  &gt; {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => <Message key={i} msg={m} />)}

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 18 }}>
            <div style={{ fontSize: 11, color: "#00ff88", marginBottom: 4, letterSpacing: 1 }}>Gold GYM</div>
            <div style={{
              background: "#0d1f0d", border: "1px solid #00ff8840",
              borderRadius: 4, padding: "4px 14px", boxShadow: "0 0 12px #00ff8815",
            }}>
              <TypingIndicator />
            </div>
          </div>
        )}

        {error && (
          <div style={{
            background: "#1a0505", border: "1px solid #ff4040",
            color: "#ff6060", borderRadius: 4, padding: "10px 14px",
            fontSize: 12, marginBottom: 16,
          }}>
            ⚠ {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        borderTop: "1px solid #1a3a1a", background: "#0d0d0d",
        padding: "12px 20px", maxWidth: 760, width: "100%",
        margin: "0 auto", boxSizing: "border-box",
      }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: 10,
          border: "1px solid #1e4a1e", borderRadius: 4,
          padding: "8px 12px", background: "#0a120a",
          boxShadow: "0 0 20px #00ff8810",
        }}>
          <span style={{ color: "#00ff88", fontSize: 14, paddingBottom: 2 }}>&gt;</span>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask Gold GYM anything... (Shift+Enter for new line)"
            rows={1}
            style={{
              flex: 1, background: "transparent", border: "none",
              color: "#ccc", fontFamily: "monospace", fontSize: 13,
              lineHeight: 1.6, maxHeight: 120, overflowY: "auto",
              caretColor: "#00ff88",
            }}
            onInput={e => {
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim() ? "#1a2a1a" : "#00ff88",
              border: "none", borderRadius: 3,
              color: loading || !input.trim() ? "#446644" : "#000",
              padding: "5px 12px",
              cursor: loading || !input.trim() ? "default" : "pointer",
              fontFamily: "monospace", fontSize: 12, fontWeight: "bold",
              letterSpacing: 1,
            }}>
            SEND
          </button>
        </div>
        <div style={{ color: "#334433", fontSize: 10, textAlign: "center", marginTop: 8, letterSpacing: 1 }}>
          Gold GYM can make mistakes · Please double check responses
        </div>
      </div>
    </div>
  );
}