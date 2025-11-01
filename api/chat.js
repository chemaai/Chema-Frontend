"use server";  

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = await req.json ? await req.json() : req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    return res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Chema backend error:", error);
    return res.status(500).json({ error: "Error connecting to Chema" });
  }
}
