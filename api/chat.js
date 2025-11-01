import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "No response from model.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("❌ Error in /api/chat:", error);
    res.status(500).json({
      error: error.message || "Failed to connect to OpenAI",
    });
  }
}
