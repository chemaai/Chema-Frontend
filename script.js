const input = document.getElementById("prompt");
const button = document.getElementById("askBtn");
const chatLog = document.getElementById("chat-log");

button.addEventListener("click", async () => {
  const userInput = input.value.trim();
  if (!userInput) return;
  
  const userBubble = document.createElement("div");
  userBubble.className = "user-bubble";
  userBubble.textContent = userInput;
  chatLog.appendChild(userBubble);

  const botBubble = document.createElement("div");
  botBubble.className = "bot-bubble";
  botBubble.textContent = "Chema is thinking…";
  chatLog.appendChild(botBubble);

  const res = await fetch("https://chema-00yh.onrender.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userInput }),
  });

  const data = await res.json();
  botBubble.textContent = data.reply || "Error connecting to Chema";
  input.value = "";
});
