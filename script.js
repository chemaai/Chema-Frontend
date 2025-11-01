// Connects front-end to /api/chat
document.getElementById("askBtn").addEventListener("click", async () => {
  const input = document.getElementById("prompt");
  const userPrompt = input.value.trim();
  if (!userPrompt) return;

  // Show user message in chat log
  const chatLog = document.getElementById("chat-log");
  const userBubble = document.createElement("div");
  userBubble.className = "user-bubble";
  userBubble.textContent = userPrompt;
  chatLog.appendChild(userBubble);

  // Clear input
  input.value = "";

  // Call the backend API
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const data = await res.json();

    const aiBubble = document.createElement("div");
    aiBubble.className = "ai-bubble";
    aiBubble.textContent = data.reply || "Chema is thinking...";
    chatLog.appendChild(aiBubble);
  } catch (err) {
    console.error(err);
    const errorBubble = document.createElement("div");
    errorBubble.className = "ai-bubble";
    errorBubble.textContent = "Error connecting to Chema.";
    chatLog.appendChild(errorBubble);
  }
});
