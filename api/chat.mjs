import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const body = req.body || {};
    const prompt = body.prompt || "Say hello, Chema.";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Chema, the intelligent AI CEO that leads." },
        { role: "user", content: prompt },
      ],
    });

    const message = completion.choices?.[0]?.message?.content || "No response.";
    res.status(200).json({ reply: message });
  } catch (err) {
    console.error("Chema backend error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
