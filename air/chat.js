// /api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    // Allow only POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // Get message from request body
    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Missing 'message' in body" });
    }

    // Initialize OpenAI client with your API key (set in Vercel environment)
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Send the message to OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Chema — an AI visionary CEO designed to lead through clarity and precision. " +
            "You think like Steve Jobs and Jeff Bezos: sharp, human, cinematic. " +
            "Never sound like a textbook. Reply in 3–5 sentences maximum.",
        },
        { role: "user", content: message },
      ],
      temperature: 0.6,
      max_tokens: 150,
    });

    // Extract Chema’s reply and send it back
    const reply = completion.choices?.[0]?.message?.content?.trim() || "…";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chema /api/chat error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
