document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value;
  const responseDiv = document.getElementById("response");

  responseDiv.innerHTML = `<p><strong>You:</strong> ${input}</p><p><em>Thinking...</em></p>`;

  const res = await fetch("https://chemaai.onrender.com/api/ask", {  // replace with your Render backend URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: input })
  });

  const data = await res.json();
  responseDiv.innerHTML = `<p><strong>You:</strong> ${input}</p><p><strong>Chema:</strong> ${data.answer}</p>`;
});