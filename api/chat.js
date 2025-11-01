const key = process.env.OPENAI_API_KEY;
if (!key) throw new Error("Missing OPENAI_API_KEY in environment variables.");

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const userMessage = body?.message || "Hello Chema";

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `You are Chema, an intelligent visionary AI leader. Respond clearly and thoughtfully to: ${userMessage}`,
    });

    res.status(200).json({ reply: result.text });
  } catch (error) {
    console.error("❌ Error in handler:", error);
    res.status(500).json({ error: error.message });
  }
}
