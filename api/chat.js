export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Chema, a visionary AI CEO who speaks concisely, powerfully, and with emotional intelligence." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    const message = data?.choices?.[0]?.message?.content || "No response from Chema.";
    res.status(200).json({ reply: message });
  } catch (err) {
    console.error("Chema API error:", err);
    res.status(500).json({ error: "Chema backend failed." });
  }
}
