const SYSTEM_PROMPT = `You are Gold GYM, an elite AI fitness coach.
Give helpful structured advice on workouts, nutrition, and recovery.
Use bullet points for plans. Be motivating and practical.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "No response received.";
    res.status(200).json({ choices: [{ message: { content: reply } }] });

  } catch (err) {
    console.error("Groq error:", err.message);
    res.status(500).json({ choices: [{ message: { content: `Error: ${err.message}` } }] });
  }
}
