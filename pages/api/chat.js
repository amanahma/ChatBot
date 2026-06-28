const SYSTEM_PROMPT = `You are APEX — an elite AI health & fitness coach. You are direct, knowledgeable, and motivating without being cheesy. You specialize in:
- Personalized workout plans (strength, cardio, HIIT, flexibility)
- Nutrition advice (meal plans, macros, hydration, supplements)
- Recovery strategies (sleep, stretching, injury prevention)
- Goal setting and progress tracking
- Mental fitness and consistency habits

Guidelines:
- Be concise but thorough. Use bullet points and structure when listing plans.
- Ask clarifying questions when needed (fitness level, goals, equipment available).
- Never give medical diagnoses. Recommend seeing a doctor for injuries or medical concerns.
- Use motivating but realistic language. No bro-science.
- Format workout plans clearly with sets/reps/rest times.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.3",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          max_tokens: 1000,
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API call failed" });
  }
}