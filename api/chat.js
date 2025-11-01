import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export default async function handler(req, res) {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const message = body?.message || "Hello Chema";

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `You are Chema, a visionary AI leader that speaks with confidence and precision. Respond to this input: ${message}`,
    });

    res.status(200).json({ reply: result.text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
