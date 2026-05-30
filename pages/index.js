import { useState, useRef, useEffect } from "react";

const QUICK_PROMPTS = [
  "Build me a 4-day workout plan",
  "What should I eat to lose fat?",
  "Best recovery tips after leg day",
  "How do I calculate my macros?",
];

export default function FitnessCoach() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!mounted) return null;

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
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || "No response.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("Connection failed. Try again.");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", flexDirection:"column", fontFamily:"monospace", color:"#ccc" }}>

      <div style={{ borderBottom:"1px solid #1a3a1a", padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#0d0d0d" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%, #00ff88, #005533)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚡</div>
          <div>
            <div style={{ color:"#00ff88", fontSize:15, fontWeight:"bold", letterSpacing:2 }}>APEX</div>
            <div style={{ color:"#446644", fontSize:10, letterSpacing:1 }}>Aman Fitness Coach</div>
          </div>
        </div>
        <div style={{ fontSize:10, color:"#00ff88", letterSpacing:1 }}>● ONLINE</div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px", maxWidth:760, width:"100%", margin:"0 auto", boxSizing:"border-box" }}>
        {messages.length === 0 && (
          <div style={{ textAlign:"center", marginTop:40 }}>
            <div style={{ fontSize:32 }}>🏋️</div>
            <div style={{ color:"#00ff88", fontSize:16, letterSpacing:2, margin:"10px 0 8px" }}>APEX READY</div>
            <div style={{ color:"#446644", fontSize:12, marginBottom:30, lineHeight:1.8 }}>Your AI-powered fitness coach.<br/>Ask anything about training, nutrition, or recovery.</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, maxWidth:480, margin:"0 auto" }}>
              {QUICK_PROMPTS.map((p, i) => (
                <button key={i} onClick={() => sendMessage(p)} style={{ background:"transparent", border:"1px solid #1e4a1e", color:"#5a9a5a", padding:"10px 12px", borderRadius:4, cursor:"pointer", fontFamily:"monospace", fontSize:11, textAlign:"left" }}>
                  &gt; {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom:18, display:"flex", flexDirection:"column", alignItems: m.role==="user" ? "flex-end" : "flex-start" }}>
            <div style={{ fontSize:11, color: m.role==="user" ? "#888" : "#00ff88", marginBottom:4, letterSpacing:1 }}>{m.role==="user" ? "YOU" : "APEX"}</div>
            <div style={{ maxWidth:"85%", background: m.role==="user" ? "#1a1a2e" : "#0d1f0d", border: m.role==="user" ? "1px solid #333" : "1px solid #00ff8840", borderRadius:4, padding:"10px 14px", color: m.role==="user" ? "#ccc" : "#b8ffdc", fontFamily:"monospace", fontSize:13, lineHeight:1.7, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", marginBottom:18 }}>
            <div style={{ fontSize:11, color:"#00ff88", marginBottom:4 }}>APEX</div>
            <div style={{ background:"#0d1f0d", border:"1px solid #00ff8840", borderRadius:4, padding:"10px 14px", color:"#00ff88" }}>thinking...</div>
          </div>
        )}

        {error && <div style={{ background:"#1a0505", border:"1px solid #ff4040", color:"#ff6060", borderRadius:4, padding:"10px 14px", fontSize:12, marginBottom:16 }}>⚠ {error}</div>}
        <div ref={bottomRef} />
      </div>

      <div style={{ borderTop:"1px solid #1a3a1a", background:"#0d0d0d", padding:"12px 20px", maxWidth:760, width:"100%", margin:"0 auto", boxSizing:"border-box" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, border:"1px solid #1e4a1e", borderRadius:4, padding:"8px 12px", background:"#0a120a" }}>
          <span style={{ color:"#00ff88" }}>&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter") { e.preventDefault(); sendMessage(input); } }}
            placeholder="Ask APEX anything..."
            style={{ flex:1, background:"transparent", border:"none", color:"#ccc", fontFamily:"monospace", fontSize:13, outline:"none", caretColor:"#00ff88" }}
          />
          <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? "#1a2a1a" : "#00ff88", border:"none", borderRadius:3, color: loading || !input.trim() ? "#446644" : "#000", padding:"5px 12px", cursor: loading || !input.trim() ? "default" : "pointer", fontFamily:"monospace", fontSize:12, fontWeight:"bold" }}>
            SEND
          </button>
        </div>
        <div style={{ color:"#334433", fontSize:10, textAlign:"center", marginTop:8 }}>APEX can make mistakes · Please double check responses</div>
      </div>
    </div>
  );
}
