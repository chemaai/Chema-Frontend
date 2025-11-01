document.getElementById("askBtn").addEventListener("click", sendPrompt);
document.getElementById("prompt").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendPrompt();
});

async function sendPrompt() {
  const input = document.getElementById("prompt");
  const text = input.value.trim();
  if (!text) return;

  appendBubble(text, "user");
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    const data = await res.json();
    appendBubble(data.reply || data.error || "No response.", "assistant");
  } catch (err) {
    appendBubble(`Error: ${err.message}`, "assistant");
  }
}

function appendBubble(text, who) {
  const chat = document.getElementById("chat-log");
  const bubble = document.createElement("div");
  bubble.className = `bubble ${who}`;
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
}
