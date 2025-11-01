export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
  }

  try {
    const body = await req.json();
    const prompt = body.prompt;

    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data.error?.message || 'OpenAI request failed'
      });
    }

    const reply = data.choices?.[0]?.message?.content || 'No response';
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chema API Error:', error);
    return res.status(500).json({ error: 'Chema server error' });
  }
}
