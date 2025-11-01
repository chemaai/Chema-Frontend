"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export default async function handler(req, res) {
  try {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const body = await req.json();
    const userMessage = body?.message || "Hello";

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: userMessage,
    });

    res.status(200).json({ text: result.text });
  } catch (error) {
    console.error("Error in /api/chat.js:", error);
    res.status(500).json({ error: error.message });
  }
}
