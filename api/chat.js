import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { prompt } = await req.json?.() || req.body || {};

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Chema, an intelligent visionary AI CEO." },
        { role: "user", content: prompt || "Say hello, Chema." },
      ],
    });

    const message = completion.choices[0].message.content;
    return res.status(200).json({ reply: message });
  } catch (error) {
    console.error("Chema API error:", error);
    return res.status(500).json({
      error: "Backend error",
      details: error.message,
    });
  }
}
